<script>
	// Self-hosted fonts (replaces render-blocking Google Fonts)
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/raleway/300.css';
	import '@fontsource/raleway/400.css';
	import '@fontsource/monoton/400.css';

	// Global styles (migrated verbatim from original site)
	import '$lib/styles/icons.css';
	import '$lib/styles/main.css';
	import '$lib/styles/s.css';

	let { children } = $props();
</script>

{@render children()}
