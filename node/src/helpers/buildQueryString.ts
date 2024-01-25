export function buildQueryString (options: Record<string, any>): string {
  const search = options.search != null ? `&search=${options.search}` : ''
  const limit = options.limit != null ? `&limit=${options.limit}` : ''
  const offset = options.offset != null ? `&offset=${options.offset}` : ''
  return `?locale=en${limit}${search}${offset}`
}
