import sanitizeHtml from "sanitize-html";

export function sanitizeRestoName(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}
