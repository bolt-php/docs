import { createContentLoader } from 'vitepress'

interface ModuleEntry {
  slug: string
  html: string
}

declare const data: Record<string, ModuleEntry>
export { data }

export default createContentLoader('modules/*.md', {
  render: true,
  transform(raw): Record<string, ModuleEntry> {
    const out: Record<string, ModuleEntry> = {}
    for (const { url, html } of raw) {
      // url looks like "/modules/auth.html" (or "/modules/index.html" — skipped below)
      const slug = url.replace(/^\/modules\//, '').replace(/\.html$/, '')
      if (!slug || slug === 'index') continue
      // Strip a leading H1 if present, since the modal already shows the title.
      const cleaned = (html ?? '').replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, '')
      out[slug] = { slug, html: cleaned }
    }
    return out
  }
})
