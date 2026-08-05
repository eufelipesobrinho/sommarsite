/** Checkouts oficiais Cakto — Sommar App */
export const CAKTO_ANNUAL = 'https://pay.cakto.com.br/itbvz49';
export const CAKTO_MONTHLY = 'https://pay.cakto.com.br/ni9nrpf_687767';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'src',
] as const;

/** Persiste UTMs da URL no sessionStorage. */
export function persistTrafficParams(search?: string): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(search ?? window.location.search);
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) sessionStorage.setItem(key, value);
  });
  params.forEach((value, key) => {
    if (key.startsWith('utm_') && value) sessionStorage.setItem(key, value);
  });
}

/** Monta URL de checkout Cakto preservando UTMs da página + sessionStorage. */
export function buildCaktoCheckoutUrl(baseCheckoutUrl: string): string {
  const url = new URL(baseCheckoutUrl);
  const merged = new URLSearchParams();

  if (typeof window !== 'undefined') {
    UTM_KEYS.forEach((key) => {
      const value = sessionStorage.getItem(key);
      if (value) merged.set(key, value);
    });
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (value && (key.startsWith('utm_') || key === 'src')) {
        merged.set(key, value);
      }
    });
  }

  const source = merged.get('utm_source');
  if (source && !merged.get('src')) merged.set('src', source);

  merged.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}
