const OMAN_CC = '968';
const OMAN_LOCAL_LENGTH = 8;
export const OMAN_MOBILE_FULL_LENGTH = OMAN_CC.length + OMAN_LOCAL_LENGTH;

export const OMAN_MOBILE_REGEX = /^968[279]\d{7}$/;
export const OMAN_MOBILE_ERROR =
  'Omani numbers must be 8 digits and start with 2, 7 or 9';

export function formatPhone(raw: string | null | undefined): string {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const local = digits.startsWith(OMAN_CC)
    ? digits.slice(OMAN_CC.length)
    : digits;
  const rest = local.match(/.{1,4}/g)?.join(' ') ?? '';
  return rest ? `+${OMAN_CC} ${rest}` : `+${OMAN_CC}`;
}

/**
 * Normalize user input for an Omani mobile field: keep the `968` country
 * code, drop non-digits, cap the local part at 8 digits. Does not enforce
 * the leading-digit rule — that's surfaced as a validation error via
 * OMAN_MOBILE_REGEX so the user sees a clear message instead of typing
 * into a silently-rejected input.
 */
export function sanitizeOmanMobileInput(value: string): string {
  const digits = value.replace(/\D/g, '');
  const local = digits.startsWith(OMAN_CC)
    ? digits.slice(OMAN_CC.length)
    : digits;
  return OMAN_CC + local.slice(0, OMAN_LOCAL_LENGTH);
}
