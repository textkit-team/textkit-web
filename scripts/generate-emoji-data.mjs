#!/usr/bin/env node
/**
 * Generate /lib/emoji-data.ts from Unicode emoji-test.txt
 *
 * Usage:
 *   node scripts/generate-emoji-data.mjs
 *   node scripts/generate-emoji-data.mjs --version 16.0
 *   node scripts/generate-emoji-data.mjs --url https://unicode.org/Public/emoji/16.0/emoji-test.txt
 *   node scripts/generate-emoji-data.mjs --out lib/emoji-data.ts
 *
 * Notes:
 * - Parses only "fully-qualified" by default (recommended to avoid ambiguous variants).
 * - Groups become categories. You can later add your own Korean titles/descriptions.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

// Unicode group name -> Korean title/description mapping
const KO_GROUP_META = {
  "Smileys & Emotion": {
    title: "표정 · 감정",
    description: "웃음, 감정, 분위기를 표현하는 이모지",
  },
  "People & Body": {
    title: "사람 · 신체",
    description: "사람, 손/제스처, 신체 관련 이모지",
  },
  "Animals & Nature": {
    title: "동물 · 자연",
    description: "동물, 식물, 자연/날씨 이모지",
  },
  "Food & Drink": {
    title: "음식 · 음료",
    description: "음식, 음료, 디저트 이모지",
  },
  "Travel & Places": {
    title: "여행 · 장소",
    description: "교통, 건물, 지역/장소 이모지",
  },
  Activities: {
    title: "활동",
    description: "운동, 게임, 이벤트/취미 이모지",
  },
  Objects: {
    title: "사물",
    description: "도구, 기기, 생활용품 이모지",
  },
  Symbols: {
    title: "기호",
    description: "체크, 경고, 아이콘/기호 이모지",
  },
  Flags: {
    title: "국기",
    description: "국가/지역 국기 이모지",
  },
};

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  if (i === -1) return null;
  return process.argv[i + 1] ?? null;
}

const OUT_PATH = argValue("--out") ?? "lib/emoji-data.ts";
const VERSION = argValue("--version"); // e.g. "16.0"
const URL =
  argValue("--url") ??
  (VERSION
    ? `https://unicode.org/Public/emoji/${VERSION}/emoji-test.txt`
    : // "latest" isn't a stable directory name; pick a default you can update.
      // You can always pass --version when Unicode updates.
      `https://unicode.org/Public/emoji/16.0/emoji-test.txt`);

const ONLY_FULLY_QUALIFIED = !process.argv.includes("--include-non-fully-qualified");

function slugifyGroupName(name) {
  // e.g. "Smileys & Emotion" -> "smileys-emotion"
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toEmojiFromCodepoints(hexSeq) {
  // hexSeq: "1F600" or "1F469 200D 1F4BB"
  const cps = hexSeq
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((h) => parseInt(h, 16))
    .filter((n) => Number.isFinite(n));
  return String.fromCodePoint(...cps);
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch emoji-test.txt (${res.status}): ${url}`);
  }
  return await res.text();
}

function parseEmojiTest(txt) {
  const lines = txt.split(/\r?\n/);

  /** @type {string|null} */
  let currentGroup = null;
  /** @type {string|null} */
  let currentSubgroup = null;

  /** @type {Map<string, {group: string, subgroup: string, emoji: string, name: string, status: string}>} */
  const byEmoji = new Map();

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Headers
    // "# group: Smileys & Emotion"
    if (trimmed.startsWith("# group:")) {
      currentGroup = trimmed.replace("# group:", "").trim();
      currentSubgroup = null;
      continue;
    }
    // "# subgroup: face-smiling"
    if (trimmed.startsWith("# subgroup:")) {
      currentSubgroup = trimmed.replace("# subgroup:", "").trim();
      continue;
    }

    // Data lines look like:
    // "1F600                                      ; fully-qualified     # 😀 E1.0 grinning face"
    // "1F469 200D 1F4BB                            ; fully-qualified     # 👩‍💻 E4.0 woman technologist"
    // We capture the left codepoints, status, and the name after version.
    const m = trimmed.match(/^([0-9A-F ]+)\s*;\s*([a-z-]+)\s*#\s*(.+)$/i);
    if (!m) continue;

    if (!currentGroup) continue; // should not happen but be safe
    const hexSeq = m[1].trim();
    const status = m[2].trim().toLowerCase();
    const rhs = m[3].trim();

    if (ONLY_FULLY_QUALIFIED && status !== "fully-qualified") continue;

    // rhs format: "😀 E1.0 grinning face"
    // There can be multiple spaces; emoji itself is first token (may include ZWJ etc, but in rhs it's rendered)
    // Safer to compute emoji from codepoints instead of taking first token.
    const emoji = toEmojiFromCodepoints(hexSeq);

    // Extract name after the version token like "E15.1"
    // If not found, keep the whole rhs as name.
    let name = rhs;
    const vm = rhs.match(/\bE\d+(?:\.\d+)?\b\s+(.+)$/);
    if (vm) name = vm[1].trim();

    const subgroup = currentSubgroup ?? "unknown";

    // Deduplicate by emoji (keep the first occurrence)
    if (!byEmoji.has(emoji)) {
      byEmoji.set(emoji, { group: currentGroup, subgroup, emoji, name, status });
    }
  }

  return Array.from(byEmoji.values());
}

function buildTsFile(parsed, sourceUrl) {
  // Group -> emojis
  /** @type {Map<string, {slug: string, group: string, emojis: string[]}>} */
  const groupMap = new Map();

  for (const item of parsed) {
    const group = item.group;
    const slug = slugifyGroupName(group);
    const entry = groupMap.get(group) ?? { slug, group, emojis: [] };
    entry.emojis.push(item.emoji);
    groupMap.set(group, entry);
  }

  const groups = Array.from(groupMap.values()).sort((a, b) =>
    a.slug.localeCompare(b.slug)
  );

  // To keep output stable, sort emojis within group by codepoint string order
  for (const g of groups) {
    g.emojis = Array.from(new Set(g.emojis));
    // stable-ish sort by UTF-16 string; good enough for deterministic output
    g.emojis.sort((a, b) => a.localeCompare(b));
  }

  const categorySlugs = groups.map((g) => g.slug);

  const metaLines = groups
  .map((g) => {
    const ko = KO_GROUP_META[g.group];
    const koTitle = ko?.title ?? g.group; // 한글 없으면 영문으로 대체
    const koDesc = ko?.description ?? `Unicode group: ${g.group}`;

    // 화면에는 "한글 (영문)" 형태로 같이 표시
    const title = `${koTitle} (${g.group})`;
    const description = `${koDesc} (${g.group})`;

    return `  "${g.slug}": { title: ${JSON.stringify(title)}, description: ${JSON.stringify(description)} },`;
  })
  .join("\n");

  const emojiLines = groups
    .map((g) => {
      const arr = g.emojis.map((e) => JSON.stringify(e)).join(", ");
      return `  "${g.slug}": [${arr}],`;
    })
    .join("\n");

  const catsArr = categorySlugs.map((s) => JSON.stringify(s)).join(", ");

  return `/**
 * AUTO-GENERATED FILE — DO NOT EDIT BY HAND
 * Generated from: ${sourceUrl}
 *
 * Tip:
 * - If you want Korean titles/descriptions, edit CATEGORY_META after generation,
 *   or generate -> then apply a post-process map.
 */

export const ALL_CATEGORIES = [${catsArr}] as const;
export type EmojiCategory = (typeof ALL_CATEGORIES)[number];

export const CATEGORY_META: Record<EmojiCategory, { title: string; description: string }> = {
${metaLines}
};

export const EMOJIS: Record<EmojiCategory, string[]> = {
${emojiLines}
};

export function getAllEmojiFlat(): string[] {
  const set = new Set<string>();
  for (const cat of ALL_CATEGORIES) {
    for (const e of EMOJIS[cat]) set.add(e);
  }
  return Array.from(set);
}
`;
}

async function main() {
  const txt = await fetchText(URL);
  const parsed = parseEmojiTest(txt);
  if (parsed.length === 0) {
    throw new Error("Parsed 0 emojis. Check URL/version or parser.");
  }

  const ts = buildTsFile(parsed, URL);

  const outAbs = path.resolve(process.cwd(), OUT_PATH);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, ts, "utf8");

  console.log(`✅ Generated ${OUT_PATH}`);
  console.log(`   Source: ${URL}`);
  console.log(`   Count: ${parsed.length} (deduped)`);
  console.log(`   Categories: ${new Set(parsed.map((x) => x.group)).size}`);
}

main().catch((err) => {
  console.error("❌ Failed:", err?.message ?? err);
  process.exit(1);
});
