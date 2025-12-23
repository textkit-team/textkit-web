#!/usr/bin/env node
/**
 * Generate /lib/emoji-data.ts from Unicode emoji-test.txt
 * and (optionally) CLDR Korean emoji annotations.
 *
 * Why:
 * - emoji-test.txt provides canonical English names + grouping.
 * - CLDR annotations provide localized Korean names + keywords.
 *
 * Usage:
 *   node scripts/generate-emoji-data.mjs
 *   node scripts/generate-emoji-data.mjs --version 16.0
 *   node scripts/generate-emoji-data.mjs --url https://unicode.org/Public/emoji/16.0/emoji-test.txt
 *   node scripts/generate-emoji-data.mjs --input ./emoji-test.txt
 *   node scripts/generate-emoji-data.mjs --out lib/emoji-data.ts
 *
 * Korean annotations:
 *   node scripts/generate-emoji-data.mjs --cldr-ko https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotations/ko.xml \
 *     --cldr-ko-derived https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotationsDerived/ko.xml
 *
 * Notes:
 * - Parses only "fully-qualified" by default (recommended).
 * - The generated EMOJI_META includes pre-computed `search` string for fast substring search.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

// Unicode group name -> Korean title/description mapping (UI only)
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
const INPUT_PATH = argValue("--input");
const URL =
  argValue("--url") ??
  (VERSION
    ? `https://unicode.org/Public/emoji/${VERSION}/emoji-test.txt`
    : // "latest" isn't a stable directory name; pick a default you can update.
      `https://unicode.org/Public/emoji/16.0/emoji-test.txt`);

// CLDR Korean annotations (optional)
const CLDR_KO_URL =
  argValue("--cldr-ko") ??
  "https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotations/ko.xml";
const CLDR_KO_DERIVED_URL =
  argValue("--cldr-ko-derived") ??
  "https://raw.githubusercontent.com/unicode-org/cldr/main/common/annotationsDerived/ko.xml";
const CLDR_KO_INPUT = argValue("--cldr-ko-input");
const CLDR_KO_DERIVED_INPUT = argValue("--cldr-ko-derived-input");

const INCLUDE_KO = !process.argv.includes("--no-ko");

const ONLY_FULLY_QUALIFIED = !process.argv.includes(
  "--include-non-fully-qualified"
);

function slugifyGroupName(name) {
  // e.g. "Smileys & Emotion" -> "smileys-and-emotion"
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
    throw new Error(`Failed to fetch (${res.status}): ${url}`);
  }
  return await res.text();
}

function readTextFile(p) {
  return fs.readFileSync(path.resolve(process.cwd(), p), "utf8");
}

function decodeXmlEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

/**
 * Parse CLDR annotations XML:
 * - type="tts" is the primary name
 * - without type is keywords separated by " | "
 */
function parseCldrAnnotationsXml(xml) {
  const out = new Map();

  // The CLDR XML can be 1 line; do a global regex.
  const re = /<annotation\s+([^>]*?)>([\s\S]*?)<\/annotation>/g;
  let m;
  while ((m = re.exec(xml))) {
    const attrs = m[1] ?? "";
    const text = decodeXmlEntities((m[2] ?? "").trim());
    const cpMatch = attrs.match(/\bcp="([^"]+)"/);
    if (!cpMatch) continue;
    const emoji = cpMatch[1];
    const typeMatch = attrs.match(/\btype="([^"]+)"/);
    const type = typeMatch ? typeMatch[1] : null;

    const cur = out.get(emoji) ?? { tts: null, keywords: [] };
    if (type === "tts") {
      cur.tts = text;
    } else {
      // keywords are delimited by | in CLDR
      const parts = text
        .split(/\s*\|\s*/)
        .map((x) => x.trim())
        .filter(Boolean);
      cur.keywords.push(...parts);
    }
    out.set(emoji, cur);
  }

  // de-dup keywords
  for (const [k, v] of out.entries()) {
    v.keywords = Array.from(new Set(v.keywords));
    out.set(k, v);
  }
  return out;
}

function parseEmojiTest(txt) {
  const lines = txt.split(/\r?\n/);

  let currentGroup = null;
  let currentSubgroup = null;

  /** @type {Map<string, {group: string, subgroup: string, emoji: string, name: string, status: string}>} */
  const byEmoji = new Map();

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("# group:")) {
      currentGroup = trimmed.replace("# group:", "").trim();
      currentSubgroup = null;
      continue;
    }
    if (trimmed.startsWith("# subgroup:")) {
      currentSubgroup = trimmed.replace("# subgroup:", "").trim();
      continue;
    }

    const m = trimmed.match(/^([0-9A-F ]+)\s*;\s*([a-z-]+)\s*#\s*(.+)$/i);
    if (!m) continue;
    if (!currentGroup) continue;

    const hexSeq = m[1].trim();
    const status = m[2].trim().toLowerCase();
    const rhs = m[3].trim();
    if (ONLY_FULLY_QUALIFIED && status !== "fully-qualified") continue;

    const emoji = toEmojiFromCodepoints(hexSeq);

    // rhs format: "😀 E1.0 grinning face"
    let name = rhs;
    const vm = rhs.match(/\bE\d+(?:\.\d+)?\b\s+(.+)$/);
    if (vm) name = vm[1].trim();

    const subgroup = currentSubgroup ?? "unknown";
    if (!byEmoji.has(emoji)) {
      byEmoji.set(emoji, { group: currentGroup, subgroup, emoji, name, status });
    }
  }

  return Array.from(byEmoji.values());
}

function tokenizeEnglish(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function buildTsFile(parsed, sourceUrl, koMap) {
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

  for (const g of groups) {
    g.emojis = uniq(g.emojis);
    g.emojis.sort((a, b) => a.localeCompare(b));
  }

  const categorySlugs = groups.map((g) => g.slug);
  const catsArr = categorySlugs.map((s) => JSON.stringify(s)).join(", ");

  const metaLines = groups
    .map((g) => {
      const ko = KO_GROUP_META[g.group];
      const koTitle = ko?.title ?? g.group;
      const koDesc = ko?.description ?? `Unicode group: ${g.group}`;
      const title = `${koTitle} (${g.group})`;
      const description = `${koDesc} (${g.group})`;
      return `  ${JSON.stringify(g.slug)}: { title: ${JSON.stringify(
        title
      )}, description: ${JSON.stringify(description)} },`;
    })
    .join("\n");

  const emojiLines = groups
    .map((g) => {
      const arr = g.emojis.map((e) => JSON.stringify(e)).join(", ");
      return `  ${JSON.stringify(g.slug)}: [${arr}],`;
    })
    .join("\n");

  // Build meta map for search
  const metaObjLines = parsed
    .map((it) => {
      const category = slugifyGroupName(it.group);
      const subgroup = it.subgroup;
      const enName = it.name;

      const enKeywords = uniq([
        ...tokenizeEnglish(enName),
        ...tokenizeEnglish(it.group),
        ...tokenizeEnglish(subgroup),
      ]);

      const ko = koMap?.get(it.emoji);
      const koName = ko?.tts ?? null;
      const koKeywords = uniq((ko?.keywords ?? []).filter(Boolean));

      // Precomputed search string (lowercased for substring match)
      const search = [
        it.emoji,
        enName,
        ...enKeywords,
        koName ?? "",
        ...koKeywords,
        it.group,
        subgroup,
      ]
        .join(" ")
        .toLowerCase();

      return `  ${JSON.stringify(it.emoji)}: { name: ${JSON.stringify(
        enName
      )}, keywords: ${JSON.stringify(enKeywords)}, koName: ${
        koName ? JSON.stringify(koName) : "undefined"
      }, koKeywords: ${
        koKeywords.length ? JSON.stringify(koKeywords) : "undefined"
      }, category: ${JSON.stringify(category)}, subgroup: ${JSON.stringify(
        subgroup
      )}, search: ${JSON.stringify(search)} },`;
    })
    .join("\n");

  return `/**
 * AUTO-GENERATED FILE — DO NOT EDIT BY HAND
 * Generated from: ${sourceUrl}
 *
 * Includes:
 * - EMOJIS by category (Unicode group)
 * - EMOJI_META (English name + tokens + optional Korean name/keywords + precomputed search)
 */

export const ALL_CATEGORIES = [${catsArr}] as const;
export type EmojiCategory = (typeof ALL_CATEGORIES)[number];

export const CATEGORY_META: Record<EmojiCategory, { title: string; description: string }> = {
${metaLines}
};

export const EMOJIS: Record<EmojiCategory, string[]> = {
${emojiLines}
};

export type EmojiMeta = {
  name: string;
  keywords: string[];
  /** Localized Korean name from CLDR (if available). */
  koName?: string;
  /** Localized Korean keywords from CLDR (if available). */
  koKeywords?: string[];
  category: EmojiCategory;
  subgroup: string;
  /** Precomputed lowercase string for fast substring matching. */
  search: string;
};

export const EMOJI_META: Record<string, EmojiMeta> = {
${metaObjLines}
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
  const emojiTxt = INPUT_PATH ? readTextFile(INPUT_PATH) : await fetchText(URL);
  const parsed = parseEmojiTest(emojiTxt);
  if (parsed.length === 0) {
    throw new Error("Parsed 0 emojis. Check URL/version or parser.");
  }

  let koMap = null;
  if (INCLUDE_KO) {
    try {
      const koXml = CLDR_KO_INPUT ? readTextFile(CLDR_KO_INPUT) : await fetchText(CLDR_KO_URL);
      const koDerivedXml = CLDR_KO_DERIVED_INPUT
        ? readTextFile(CLDR_KO_DERIVED_INPUT)
        : await fetchText(CLDR_KO_DERIVED_URL);

      const base = parseCldrAnnotationsXml(koXml);
      const derived = parseCldrAnnotationsXml(koDerivedXml);

      // merge derived into base
      for (const [emoji, v] of derived.entries()) {
        const cur = base.get(emoji) ?? { tts: null, keywords: [] };
        if (!cur.tts && v.tts) cur.tts = v.tts;
        cur.keywords = uniq([...(cur.keywords ?? []), ...(v.keywords ?? [])]);
        base.set(emoji, cur);
      }
      koMap = base;
    } catch (err) {
      console.warn(
        "⚠️  Korean annotations fetch/parse failed. Generating without Korean meta.",
        err?.message ?? err
      );
      koMap = null;
    }
  }

  const ts = buildTsFile(parsed, INPUT_PATH ? INPUT_PATH : URL, koMap);

  const outAbs = path.resolve(process.cwd(), OUT_PATH);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  fs.writeFileSync(outAbs, ts, "utf8");

  console.log(`✅ Generated ${OUT_PATH}`);
  console.log(`   Source: ${INPUT_PATH ? INPUT_PATH : URL}`);
  console.log(`   Count: ${parsed.length} (deduped)`);
  console.log(`   Categories: ${new Set(parsed.map((x) => x.group)).size}`);
  console.log(`   Korean meta: ${koMap ? "enabled" : "disabled"}`);
}

main().catch((err) => {
  console.error("❌ Failed:", err?.message ?? err);
  process.exit(1);
});
