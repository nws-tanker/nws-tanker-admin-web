export function formatPhone(raw: string | null | undefined): string {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const cc = digits.startsWith('968') ? '968' : digits.slice(0, 3);
  const rest =
    digits
      .slice(cc.length)
      .match(/.{1,4}/g)
      ?.join(' ') ?? '';
  return rest ? `+${cc} ${rest}` : `+${cc}`;
}
