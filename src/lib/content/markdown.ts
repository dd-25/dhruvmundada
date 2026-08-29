import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

/**
 * Markdown bodies are rendered at build time, so no markdown parser ships to
 * the browser. Content is the site owner's own, never user input, so the HTML
 * is not sanitised — do not point this at anything you did not write.
 */
export async function renderMarkdown(body: string): Promise<string | null> {
  const trimmed = body.trim();
  if (!trimmed) return null;

  const file = await remark().use(remarkGfm).use(remarkHtml).process(trimmed);
  return String(file);
}
