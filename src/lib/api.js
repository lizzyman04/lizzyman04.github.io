import { env } from '$env/dynamic/public';
import { browser } from '$app/environment';

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

// ---- Sanctum SPA cookie auth (browser only) ----

function readCookie(name) {
	if (!browser) return null;
	const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return m ? decodeURIComponent(m[2]) : null;
}

/** Prime the XSRF-TOKEN cookie before any stateful mutation. */
export async function ensureCsrf() {
	await fetch(apiUrl('/sanctum/csrf-cookie'), { credentials: 'include' });
}

/** Authenticated request helper (credentials + CSRF header). */
export async function api(path, { method = 'GET', body, headers = {} } = {}) {
	const isMutation = method !== 'GET' && method !== 'HEAD';
	if (isMutation) await ensureCsrf();

	const opts = {
		method,
		credentials: 'include',
		headers: {
			Accept: 'application/json',
			...(isMutation ? { 'X-XSRF-TOKEN': readCookie('XSRF-TOKEN') } : {}),
			...headers
		}
	};

	if (body instanceof FormData) {
		opts.body = body; // browser sets multipart boundary
	} else if (body !== undefined) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(body);
	}

	const res = await fetch(apiUrl(path), opts);
	const data = res.status === 204 ? null : await res.json().catch(() => null);

	if (!res.ok) {
		const err = new Error(data?.message || `API error ${res.status}`);
		err.status = res.status;
		err.data = data;
		throw err;
	}
	return data;
}

export const auth = {
	async login(email, password) {
		await ensureCsrf();
		return api('/api/login', { method: 'POST', body: { email, password } });
	},
	logout() {
		return api('/api/logout', { method: 'POST' });
	},
	async user() {
		try {
			return await api('/api/user');
		} catch (e) {
			if (e.status === 401) return null;
			throw e;
		}
	}
};

/** Upload an image, returns { path, url }. */
export async function uploadImage(file, dir = 'uploads') {
	const fd = new FormData();
	fd.append('file', file);
	fd.append('dir', dir);
	return api('/api/upload', { method: 'POST', body: fd });
}
