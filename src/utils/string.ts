export const removeHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, '').trim()
}
