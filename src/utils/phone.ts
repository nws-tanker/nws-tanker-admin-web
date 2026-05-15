const OMAN_CC = '968';

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
