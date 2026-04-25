type HydrateValue = string | number | boolean | null | undefined;

const PLACEHOLDER = /^\{(\w+)\}$/;

/**
 * Fills `{name}` placeholders in a URL template with URL-encoded values from
 * `params`. Query-string pairs whose value is `undefined` / `null` are
 * dropped entirely, and the leading `?` is omitted if all query params are
 * dropped.
 *
 *   hydrateUrl('/x?q={q}', { q: 'abc' })          → '/x?q=abc'
 *   hydrateUrl('/x?q={q}&t={t}', { q: 'a' })       → '/x?q=a'
 *   hydrateUrl('/x?q={q}&t={t}', {})               → '/x'
 */
export function hydrateUrl(
  template: string,
  params: Record<string, HydrateValue> = {},
): string {
  const [basePath, queryPart] = template.split('?');
  if (!queryPart) return basePath;

  const activePairs = queryPart.split('&').reduce<string[]>((acc, pair) => {
    const [key, placeholder] = pair.split('=');
    const match = placeholder?.match(PLACEHOLDER);
    if (!match) {
      acc.push(pair);
      return acc;
    }
    const value = params[match[1]];
    if (value === undefined || value === null) return acc;
    acc.push(`${key}=${encodeURIComponent(String(value))}`);
    return acc;
  }, []);

  return activePairs.length > 0
    ? `${basePath}?${activePairs.join('&')}`
    : basePath;
}
