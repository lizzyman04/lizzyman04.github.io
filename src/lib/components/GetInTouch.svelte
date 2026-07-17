<script>
	import { subscribe } from '$lib/api.js';
	import { locale, t } from '$lib/i18n.js';

	const ACTION = 'https://formspree.io/f/mvgprpek';

	let { visible = false, email = 'admin@tudocomlizzyman.com' } = $props();

	// --- Newsletter subscribe ---
	let subEmail = $state('');
	let subHoney = $state(''); // honeypot — bots fill it, humans don't
	let subPhase = $state('idle'); // idle | wait | success | error
	let subErr = $state(''); // thrown error message (already localized by api.js)
	let subDisabled = $state(false);

	let subBtn = $derived(
		subPhase === 'wait'
			? t('nl.wait', $locale)
			: subPhase === 'success'
				? t('nl.subscribed', $locale)
				: subPhase === 'error'
					? t('nl.retry', $locale)
					: t('nl.subscribe', $locale)
	);
	let subState = $derived(subPhase === 'idle' ? '' : subPhase);
	let subMsg = $derived(
		subPhase === 'success' ? t('nl.success', $locale) : subPhase === 'error' ? subErr : ''
	);

	async function handleSubscribe(event) {
		event.preventDefault();
		if (subHoney) return; // drop bots silently
		subPhase = 'wait';
		subDisabled = true;
		try {
			await subscribe(subEmail, { source: 'site' });
			subPhase = 'success';
			subEmail = '';
		} catch (e) {
			subPhase = 'error';
			subErr = e.message;
		} finally {
			subDisabled = false;
		}
	}

	// --- Contact form (Formspree) ---
	let phase = $state('idle'); // idle | wait | success | error
	let fbKey = $state(''); // 'ct.okFeedback' | 'ct.errFeedback'
	let disabled = $state(false);
	let resetTimer;

	let btnText = $derived(
		phase === 'wait'
			? t('ct.wait', $locale)
			: phase === 'success'
				? t('ct.sent', $locale)
				: phase === 'error'
					? t('ct.error', $locale)
					: t('ct.send', $locale)
	);
	let btnState = $derived(phase === 'idle' ? '' : phase);
	let feedbackState = $derived(phase === 'success' ? 'success' : phase === 'error' ? 'error' : '');
	let feedback = $derived(fbKey ? t(fbKey, $locale) : '');

	function scheduleReset() {
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => {
			phase = 'idle';
			disabled = false;
			fbKey = '';
		}, 30000);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		phase = 'wait';
		disabled = true;

		try {
			const res = await fetch(ACTION, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(form)
			});
			const data = await res.json();
			const ok = data.ok;
			phase = ok ? 'success' : 'error';
			fbKey = ok ? 'ct.okFeedback' : 'ct.errFeedback';
			if (ok) form.reset();
		} catch {
			phase = 'error';
			fbKey = 'ct.errFeedback';
		}
		scheduleReset();
	}
</script>

<section class="me-section" id="hire-me" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">{t('ct.title', $locale)}</h2>
		<p class="section-description">{t('ct.subtitle', $locale)}</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="contact-section">
			<div class="contact-form">
				<form onsubmit={handleSubmit}>
					<h4>{t('ct.leaveMessage', $locale)}</h4>
					<div class="form-inner">
						<input class="form-control form-45-control" type="text" name="name" autocomplete="name" placeholder={t('ct.name', $locale)} required />
						<input class="form-control form-45-control" type="email" name="email" autocomplete="email" placeholder={t('ct.email', $locale)} required />
						<input class="form-control form-100-control" type="text" name="subject" placeholder={t('ct.subject', $locale)} required />
						<textarea class="form-control form-100-control" name="message" placeholder={t('ct.message', $locale)} rows="5" required></textarea>
						<button class="form-submit {btnState}" type="submit" {disabled}>{btnText}</button>
						<p class="contact-feedback {feedbackState}" aria-live="polite" style:display={feedback ? 'block' : 'none'}>{feedback}</p>
					</div>
				</form>
			</div>
			<div class="contact-info">
				<h4>{t('ct.howToFind', $locale)}</h4>
				<p class="info-desc">{t('ct.howToFindDesc', $locale)}</p>
				<ul class="info-list">
					<li>
						<div class="info-list-inner">
							<span class="info-icon"><span class="css-icon location-icon"></span></span>
							<div class="info-details">
								<h6 class="info-type">{t('ct.location', $locale)}</h6>
								<span class="info-value">Mutauanha, Muatala, Nampula, Mozambique</span>
							</div>
						</div>
					</li>
					<li>
						<div class="info-list-inner">
							<span class="info-icon"><span class="css-icon telegram-icon"></span></span>
							<div class="info-details">
								<h6 class="info-type">Telegram</h6>
								<span class="info-value"><a href="https://t.me/lizzyman04" class="telegram-link" target="_blank" rel="noopener">@lizzyman04</a></span>
							</div>
						</div>
					</li>
					<li>
						<div class="info-list-inner">
							<span class="info-icon"><span class="css-icon tel-icon"></span></span>
							<div class="info-details">
								<h6 class="info-type">{t('ct.mobile', $locale)}</h6>
								<span class="info-value"><a href="tel:+258877603501" class="tel-link" target="_blank">+258 87 76 03 501</a></span>
							</div>
						</div>
					</li>
					<li>
						<div class="info-list-inner">
							<span class="info-icon"><span class="css-icon email-icon"></span></span>
							<div class="info-details">
								<h6 class="info-type">{t('ct.email', $locale)}</h6>
								<span class="info-value"><a href="mailto:admin@tudocomlizzyman.com" class="email-link">admin@tudocomlizzyman.com</a></span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="newsletter-section">
			<h4>{t('nl.title', $locale)}</h4>
			<p class="info-desc">{t('nl.desc', $locale)}</p>
			<form onsubmit={handleSubscribe} class="newsletter-form">
				<input
					class="form-control"
					type="email"
					name="email"
					autocomplete="email"
					placeholder={t('nl.placeholder', $locale)}
					bind:value={subEmail}
					required
				/>
				<input
					class="newsletter-hp"
					type="text"
					name="website"
					tabindex="-1"
					autocomplete="off"
					bind:value={subHoney}
					aria-hidden="true"
				/>
				<button class="form-submit {subState}" type="submit" disabled={subDisabled}>{subBtn}</button>
			</form>
			<p class="contact-feedback {subState}" aria-live="polite" style:display={subMsg ? 'block' : 'none'}>{subMsg}</p>
		</div>
	</div>
</section>

<style>
	.newsletter-section {
		margin-top: clamp(2.5rem, 6vw, 4rem);
		padding: clamp(1.5rem, 4vw, 2.5rem);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 18px;
		background-color: rgba(255, 255, 255, 0.02);
		text-align: center;
	}

	.newsletter-section .info-desc {
		font-size: 15px;
		color: #9f9f9f;
		max-width: 52ch;
		margin: 0 auto;
	}

	.newsletter-form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		max-width: 520px;
		margin: 1.5rem auto 0;
	}

	.newsletter-form .form-control {
		flex: 1 1 240px;
		min-width: 0;
		min-height: 48px;
		padding: 12px 16px;
		font-family: inherit;
		font-size: 15px;
		color: var(--whitesmoke-color);
		background-color: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		transition:
			border-color 0.2s ease,
			background-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.newsletter-form .form-control::placeholder {
		color: var(--lucky-grey-color);
	}

	.newsletter-form .form-control:hover {
		border-color: rgba(255, 255, 255, 0.2);
	}

	.newsletter-form .form-control:focus {
		outline: 0;
		background-color: rgba(255, 255, 255, 0.05);
		border-color: var(--section-alt-color);
		box-shadow: 0 0 0 3px rgba(4, 167, 119, 0.18);
	}

	.newsletter-form .form-submit {
		flex: 0 0 auto;
		min-height: 48px;
		padding: 12px 34px;
		font-family: inherit;
		font-size: 16px;
		font-weight: 500;
		color: #fff;
		background-color: #009e66;
		border: none;
		border-radius: 30px;
		transition: all 0.4s ease-in-out;
	}

	.newsletter-form .form-submit:hover:not(:disabled) {
		transform: scale(1.05);
		filter: brightness(90%);
	}

	.newsletter-form .form-submit:focus-visible {
		outline: 2px solid var(--section-alt-color);
		outline-offset: 3px;
	}

	.newsletter-form .form-submit.wait {
		background-color: #777;
	}

	.newsletter-form .form-submit.success {
		background-color: #28a745;
	}

	.newsletter-form .form-submit.error {
		background-color: #dc3545;
	}

	.newsletter-section .contact-feedback {
		margin-top: 1rem;
		font-size: 15px;
	}

	.newsletter-section .contact-feedback.success {
		color: #28a745;
	}

	.newsletter-section .contact-feedback.error {
		color: #dc3545;
	}

	@media (max-width: 480px) {
		.newsletter-form .form-control,
		.newsletter-form .form-submit {
			flex: 1 1 100%;
		}
	}

	.newsletter-hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.newsletter-form .form-submit {
			transition: none;
		}

		.newsletter-form .form-submit:hover:not(:disabled) {
			transform: none;
		}
	}
</style>
