// Parses every skills/*/SKILL.md frontmatter with the same strict YAML parser
// Tessl uses, so a bad description fails here instead of in `tessl tile publish`.
import { readdirSync, readFileSync } from "node:fs";
import { parse } from "yaml";

const LIMITS = { name: 64, description: 1024 };
let failed = false;

for (const dir of readdirSync("skills")) {
  const file = `skills/${dir}/SKILL.md`;
  const fail = (msg) => { failed = true; console.error(`✘ ${file}: ${msg}`); };
  let text;
  try { text = readFileSync(file, "utf8"); } catch { fail("missing SKILL.md"); continue; }
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) { fail("no YAML frontmatter"); continue; }
  let fm;
  try { fm = parse(match[1]); } catch (e) { fail(e.message); continue; }
  for (const [key, max] of Object.entries(LIMITS)) {
    if (typeof fm[key] !== "string" || !fm[key].trim()) fail(`frontmatter.${key} missing`);
    else if (fm[key].length > max) fail(`frontmatter.${key} is ${fm[key].length} chars (max ${max})`);
  }
  if (typeof fm.name === "string" && fm.name !== dir) fail(`frontmatter.name "${fm.name}" != folder "${dir}"`);
}

if (failed) process.exit(1);
console.log("✔ all SKILL.md frontmatter valid");
