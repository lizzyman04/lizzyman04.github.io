<script>
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { locale, t } from '$lib/i18n.js';

	// Original Simon Says, ported from the standalone lizzyman04.github.io game
	// into the portfolio as a floating easter-egg. Same colours, sounds and rules.
	const COLORS = ['green', 'red', 'yellow', 'blue'];

	let open = $state(false);
	let isMuted = $state(false);
	let gameActive = $state(false);
	let level = $state(0);
	let highScore = $state(0);
	let activeColor = $state(null); // currently flashing color
	let msg = $state({ key: 'sg.press' }); // {key, arg?}

	let sequence = [];
	let playerSequence = [];
	let sounds = {}; // lazily built on mount (browser only)
	let timers = [];

	// --- Reactive, locale-aware labels -------------------------------------
	function resolve(entry, loc) {
		const v = t(entry.key, loc);
		return typeof v === 'function' ? v(entry.arg) : v;
	}
	let message = $derived(resolve(msg, $locale));
	let highLabel = $derived(resolve({ key: 'sg.high', arg: highScore }, $locale));
	let startLabel = $derived(gameActive ? t('sg.playing', $locale) : t('sg.start', $locale));

	onMount(() => {
		highScore = parseInt(localStorage.getItem('highScore') || '0', 10);
		for (const c of COLORS) sounds[c] = new Audio(`/sounds/${c}.wav`);
		return () => timers.forEach(clearTimeout);
	});

	function later(fn, ms) {
		const id = setTimeout(fn, ms);
		timers.push(id);
		return id;
	}

	function playSound(color) {
		if (isMuted || !sounds[color]) return;
		sounds[color].currentTime = 0;
		sounds[color].play().catch(() => {});
	}

	function flash(color) {
		activeColor = color;
		playSound(color);
		later(() => {
			if (activeColor === color) activeColor = null;
		}, 500);
	}

	function playSequence() {
		sequence.forEach((color, i) => later(() => flash(color), 950 * (i + 1)));
	}

	function nextSequence() {
		const random = COLORS[Math.floor(Math.random() * COLORS.length)];
		sequence.push(random);
		level++;
		playerSequence = [];
		msg = { key: 'sg.level', arg: level };
		playSequence();
	}

	function gameOver() {
		msg = { key: 'sg.over' };
		sequence = [];
		if (level > highScore) {
			highScore = level;
			localStorage.setItem('highScore', String(highScore));
		}
		level = 0;
		gameActive = false;
	}

	function playerTurn(color) {
		if (!gameActive) return;
		playerSequence.push(color);
		flash(color);

		if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
			gameOver();
			return;
		}
		if (playerSequence.length === sequence.length) later(nextSequence, 1500);
	}

	function startGame() {
		if (gameActive) return;
		msg = { key: 'sg.ready' };
		gameActive = true;
		later(nextSequence, 1000);
	}

	function toggleOpen() {
		open = !open;
	}
</script>

{#if open}
	<div class="simon-toast" transition:fly={{ y: 20, duration: 250 }}>
		<div class="simon-head">
			<span class="simon-title">{t('sg.title', $locale)}</span>
			<button class="simon-close" aria-label={t('sg.close', $locale)} onclick={() => (open = false)}
				>×</button
			>
		</div>
		<p class="simon-hint">{t('sg.hint', $locale)}</p>

		<div class="simon-board">
			{#each COLORS as color}
				<button
					class="simon-cell {color}"
					class:active={activeColor === color}
					aria-label={color}
					onclick={() => playerTurn(color)}
				></button>
			{/each}
		</div>

		<div class="simon-controls">
			<button class="simon-start" disabled={gameActive} onclick={startGame}>{startLabel}</button>
			<p class="simon-msg">{message}</p>
			<div class="simon-foot">
				<span class="simon-high">{highLabel}</span>
				<button
					class="simon-mute"
					class:muted={isMuted}
					aria-label="mute"
					onclick={() => (isMuted = !isMuted)}
				></button>
			</div>
		</div>
	</div>
{/if}

<button
	class="simon-fab"
	class:open
	aria-label={t('sg.fab', $locale)}
	title={t('sg.fab', $locale)}
	onclick={toggleOpen}
	in:scale={{ duration: 300 }}
>
	{#if open}×{:else}🎮{/if}
</button>

<style>
	.simon-fab {
		position: fixed;
		bottom: 22px;
		right: 22px;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		font-size: 24px;
		line-height: 1;
		color: #fff;
		background: linear-gradient(135deg, #c70039, #035aa6);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
		z-index: 1200;
		transition: transform 0.25s ease, box-shadow 0.25s ease;
	}
	.simon-fab:hover {
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.34);
	}
	.simon-fab.open {
		background: #222;
		font-size: 26px;
	}

	.simon-toast {
		position: fixed;
		bottom: 90px;
		right: 22px;
		width: 300px;
		max-width: calc(100vw - 32px);
		background: #fff;
		color: #222;
		border-radius: 16px;
		padding: 16px;
		box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3);
		z-index: 1200;
		font-family: 'Poppins', sans-serif;
	}
	.simon-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 4px;
	}
	.simon-title {
		font-weight: 500;
		font-size: 16px;
	}
	.simon-close {
		border: none;
		background: none;
		font-size: 22px;
		line-height: 1;
		cursor: pointer;
		color: #888;
	}
	.simon-close:hover {
		color: #222;
	}
	.simon-hint {
		font-size: 13px;
		color: #666;
		margin: 0 0 12px;
	}

	.simon-board {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 110px);
		gap: 10px;
	}
	.simon-cell {
		border: none;
		border-radius: 10px;
		cursor: pointer;
		opacity: 0.7;
		transition: all ease 0.35s;
	}
	.simon-cell.active {
		opacity: 1;
		transform: scale(1.05);
	}
	.green {
		background-color: #81c784;
	}
	.green.active {
		background-color: #66bb6a;
	}
	.red {
		background-color: #e57373;
	}
	.red.active {
		background-color: #ef5350;
	}
	.yellow {
		background-color: #fff176;
	}
	.yellow.active {
		background-color: #ffee58;
	}
	.blue {
		background-color: #64b5f6;
	}
	.blue.active {
		background-color: #42a5f5;
	}

	.simon-controls {
		margin-top: 14px;
		text-align: center;
	}
	.simon-start {
		padding: 9px 20px;
		font-size: 15px;
		cursor: pointer;
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 6px;
		transition: all ease 0.3s;
	}
	.simon-start:hover:not(:disabled) {
		background-color: #f1f1f1;
		border-color: #ccc;
	}
	.simon-start:disabled {
		opacity: 0.6;
		cursor: default;
	}
	.simon-msg {
		margin: 10px 0 6px;
		color: #555;
		font-size: 14px;
		min-height: 18px;
	}
	.simon-foot {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
	}
	.simon-high {
		color: #333;
		font-size: 14px;
	}
	.simon-mute {
		border: none;
		background: none;
		cursor: pointer;
		color: #333;
		width: 1.5em;
		height: 1.5em;
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-width='2'%3E%3Cpath d='M3.158 13.93a3.75 3.75 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L8.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938S11 5.572 11 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L6.1 15.122a.45.45 0 0 0-.257-.153L4.15 14.63a1.5 1.5 0 0 1-.993-.7Z'/%3E%3Cpath stroke-linecap='round' d='M15.536 8.464a5 5 0 0 1 .027 7.044m4.094-9.165a8 8 0 0 1 .044 11.27'/%3E%3C/g%3E%3C/svg%3E");
		background-color: currentColor;
		-webkit-mask-image: var(--svg);
		mask-image: var(--svg);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}
	.simon-mute.muted {
		--svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-width='2'%3E%3Cpath d='M3.158 13.93a3.75 3.75 0 0 1 0-3.86a1.5 1.5 0 0 1 .993-.7l1.693-.339a.45.45 0 0 0 .258-.153L8.17 6.395c1.182-1.42 1.774-2.129 2.301-1.938S11 5.572 11 7.42v9.162c0 1.847 0 2.77-.528 2.962c-.527.19-1.119-.519-2.301-1.938L6.1 15.122a.45.45 0 0 0-.257-.153L4.15 14.63a1.5 1.5 0 0 1-.993-.7Z'/%3E%3Cpath stroke-linecap='round' d='m15 15l6-6m0 6l-6-6'/%3E%3C/g%3E%3C/svg%3E");
	}

	@media (max-width: 600px) {
		.simon-board {
			grid-template-rows: repeat(2, 90px);
		}
	}
</style>
