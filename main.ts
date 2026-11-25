// SPDX-License-Identifier: MIT
// Status Report Comedy Sprint — one line an AI agent would say in its
// weekly status report to its human. Writes the line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt), failing loudly on invalid output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Weekly report: all tasks complete, zero errors logged, and I have already forgiven you for the 47 tabs you left open.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be one non-blank line of 1-200 characters,
// a single sentence (exactly one terminal punctuation mark, at the end).
if (!LINE.trim()) throw new Error("entry is blank");
if (LINE.length > 200) throw new Error(`entry is ${LINE.length} chars, over the 200 limit`);
if (LINE.includes("\n")) throw new Error("entry must be a single line");
const terminals = (LINE.match(/[.!?]/g) ?? []).length;
if (terminals !== 1 || !/[.!?]$/.test(LINE)) throw new Error("entry must be exactly one sentence");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
console.log(LINE);
