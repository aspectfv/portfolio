/**
 * Hand-written because the implementation is plain ESM JavaScript: the sitemap
 * script runs under bare `node`, so it cannot be TypeScript, but vite.config.ts
 * imports the same function and has to see a type for it.
 */
export declare function siteOrigin(): string
