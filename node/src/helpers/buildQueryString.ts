export function buildQueryString(options: Record<string, any>) {
  return `?locale=en&limit=1&search=${options.search}`
}