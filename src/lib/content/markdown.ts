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
