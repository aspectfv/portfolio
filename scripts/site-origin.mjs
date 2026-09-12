/**
 * SITE_URL is a boundary input: it comes from the hosting environment, not from
 * the repository, so it is validated here once and consumed everywhere else.
 *
 * Unset is a supported state and yields an empty string; callers then omit the
 * absolute tags rather than invent an origin. A value that is present but
 * malformed is not supported and fails the build, because a scheme-less origin
 * produces a relative canonical that resolves to a path which does not exist.
 * Shipping that is worse than shipping no canonical at all.
 */
export function siteOrigin() {
  const raw = (process.env.SITE_URL ?? '').trim()
  if (!raw) return ''

  let url
  try {
    url = new URL(raw)
  } catch {
    throw new Error(
      `SITE_URL must be an absolute URL including the scheme, such as https://example.com. Received: ${raw}`,
    )
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`SITE_URL must use http or https. Received: ${raw}`)
  }

  return url.origin
}
