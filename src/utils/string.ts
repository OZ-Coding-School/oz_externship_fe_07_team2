export const removeHtmlTags = (html: string) => {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent ?? ''
  } catch {
    return html.replace(/<[^>]*>?/gm, '').trim()
  }
}
