"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQueryString = void 0;
function buildQueryString(options) {
    const search = options.search != null ? `&search=${options.search}` : '';
    const limit = options.limit != null ? `&limit=${options.limit}` : '';
    const offset = options.offset != null ? `&offset=${options.offset}` : '';
    return `?locale=en${limit}${search}${offset}`;
}
exports.buildQueryString = buildQueryString;
