import { env } from '$env/dynamic/public';

export const API_URL = env.PUBLIC_API_URL || 'http://localhost:8000';

/** Build an absolute API URL. */
export function apiUrl(path) {
	return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Public content for the site. Pass SvelteKit's `fetch` for SSR. */
export async function getContent(fetchFn = fetch) {
	const res = await fetchFn(apiUrl('/api/content'));
	if (!res.ok) throw new Error(`API ${res.status} loading content`);
	return res.json();
}

/**
 * Subscribe to the newsletter (double opt-in). Public endpoint.
 * Returns true when accepted; throws on validation/network error.
 */
export async function subscribe(email, { name = null, source = 'site' } = {}) {
	const res = await fetch(apiUrl('/api/subscribe'), {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({ email, name, source })
	});

	if (res.status === 429) throw new Error('Demasiados pedidos. Tente mais tarde.');
	const data = await res.json().catch(() => null);
	if (!res.ok) throw new Error(data?.message || 'Não foi possível subscrever.');
	return true;
}
