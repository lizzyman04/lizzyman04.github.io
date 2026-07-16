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
						<input class="form-control form-45-control" type="text" name="name" placeholder={t('ct.name', $locale)} required />
						<input class="form-control form-45-control" type="email" name="email" placeholder={t('ct.email', $locale)} required />
						<input class="form-control form-100-control" type="text" name="subject" placeholder={t('ct.subject', $locale)} required />
						<textarea class="form-control form-100-control" name="message" placeholder={t('ct.message', $locale)} rows="5" required></textarea>
						<button class="form-submit {btnState}" type="submit" {disabled}>{btnText}</button>
						<p class="contact-feedback {feedbackState}" style:display={feedback ? 'block' : 'none'}>{feedback}</p>
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
			<p class="contact-feedback {subState}" style:display={subMsg ? 'block' : 'none'}>{subMsg}</p>
		</div>
	</div>
</section>

<style>
	.newsletter-section {
		margin-top: 2rem;
		text-align: center;
	}
	.newsletter-form {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
		max-width: 480px;
		margin: 1rem auto 0;
	}
	.newsletter-form .form-control {
		flex: 1 1 240px;
	}
	.newsletter-hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
	}
</style>
