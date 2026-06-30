import { getContent } from '$lib/api.js';

export async function load({ fetch }) {
	const content = await getContent(fetch);
	return { content };
}
