import { writable } from 'svelte/store';
import { auth as authApi } from '$lib/api.js';

export const user = writable(undefined); // undefined = unknown, null = guest, object = logged in

export async function refreshUser() {
	const u = await authApi.user();
	user.set(u);
	return u;
}

export async function login(email, password) {
	const res = await authApi.login(email, password);
	user.set(res.user);
	return res.user;
}

export async function logout() {
	await authApi.logout();
	user.set(null);
}
