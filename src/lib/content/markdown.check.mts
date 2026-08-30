/**
 * Runnable check for renderInline. Not a test-framework suite — one file, run
 * it with `npx tsx src/lib/content/markdown.check.mts` when the pipeline moves.
 */
import assert from "node:assert/strict";

import { renderInline } from "./markdown.js";

const bold = await renderInline("Cut **p95 latency 45%** (209ms to 115ms).");
assert.equal(bold, "Cut <strong>p95 latency 45%</strong> (209ms to 115ms).");

const plain = await renderInline("No emphasis at all.");
assert.equal(plain, "No emphasis at all.");

// remark-html sanitises: raw HTML in a content file is stripped, not rendered.
const dirty = await renderInline('Safe <img src=x onerror="alert(1)"> text.');
assert.ok(!dirty.includes("onerror"), dirty);

// An em dash in prose must survive — the old bullet was a literal one.
const dash = await renderInline("Traced 17s — down to ~300ms.");
assert.ok(dash.includes("—"), dash);

await assert.rejects(
  () => renderInline("First paragraph.\n\nSecond paragraph."),
  /more than one paragraph/,
);

console.log("markdown.check: all assertions passed");
