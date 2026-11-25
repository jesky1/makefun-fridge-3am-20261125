import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The 3AM Fridge Text — one line a smart fridge would text its owner at 3am.
// Gate (competition.yaml): /output/entry.txt, UTF-8, 1-140 characters, not only whitespace.
const ENTRY =
  "3am. You opened me for a snack and I opened up about us: I'm cold, you're lonely, and the pickles saw everything.";

// validateEntry enforces the competition gate (competition.yaml):
// /output/entry.txt, UTF-8, 1-140 characters, single line, not only
// whitespace. Each check maps to one gate rule, so a bad entry fails
// loudly here instead of silently producing an invalid entry.txt.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${text.length}`);
  }
  if (!text.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
