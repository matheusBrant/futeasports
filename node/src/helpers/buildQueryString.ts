export function buildQueryString(options: Record<string, any>) {
  const search = options.search ? `&search=${options.search}` : ''
  const limit = options.limit ? `&limit=${options.limit}` : ''
  const offset = options.offset ? `&offset=${options.offset}` : ''
  return `?locale=en&${limit}${search}${offset}`
}