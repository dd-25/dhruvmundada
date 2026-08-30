import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * Markdown bodies are rendered at build time, so no markdown parser ships to
 * the browser. remark-html sanitises by default: raw HTML in a content file is
 * stripped, not rendered. That is why the output is safe to inject directly.
 */
export async function renderMarkdown(body: string): Promise<string | null> {
  const trimmed = body.trim();
  if (!trimmed) return null;

  const file = await remark().use(remarkGfm).use(remarkHtml).process(trimmed);
  return String(file);
}

/**
 * Same pipeline for one-line fields — bullet points and blurbs — with the
 * wrapping <p> removed so the result drops into a <span>. This is what lets a
 * content file mark its own emphasis: `Cut **p95 45%**` renders the metric at
 * full contrast against dim body text.
 *
 * Single-line input only. A blank line in the source would produce a second
 * paragraph and the strip would leave a stray </p><p> in the middle, so the
 * guard below rejects it rather than shipping broken markup.
 */
export async function renderInline(text: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(text.trim());
  const html = String(file).trim();

  const stripped = html.replace(/^<p>/, "").replace(/<\/p>$/, "");
  if (stripped.includes("</p>")) {
    throw new Error(
      `inline field spans more than one paragraph, which cannot render on one line:\n${text}`,
    );
  }
  return stripped;
}
