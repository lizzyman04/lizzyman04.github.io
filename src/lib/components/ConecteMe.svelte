<script>
	const ACTION = 'https://formspree.io/f/mvgprpek';

	let { visible = false } = $props();

	let btnText = $state('Get in Touch');
	let btnState = $state(''); // '', 'wait', 'success', 'error'
	let feedback = $state('');
	let feedbackState = $state('');
	let disabled = $state(false);
	let resetTimer;

	function scheduleReset() {
		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => {
			btnText = 'Get in Touch';
			btnState = '';
			disabled = false;
			feedback = '';
			feedbackState = '';
		}, 30000);
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		btnText = 'Aguarde...';
		btnState = 'wait';
		disabled = true;

		try {
			const res = await fetch(ACTION, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(form)
			});
			const data = await res.json();
			const ok = data.ok;
			btnState = ok ? 'success' : 'error';
			btnText = ok ? 'Recado deixado!' : 'Um erro ocorreu!';
			feedbackState = ok ? 'success' : 'error';
			feedback = ok
				? 'Obrigado pela sua mensagem. Ela foi enviada.'
				: 'Ocorreu um erro! Por favor, experimente outra forma de contacto.';
			if (ok) form.reset();
		} catch {
			btnState = 'error';
			btnText = 'Um erro ocorreu!';
			feedbackState = 'error';
			feedback = 'Ocorreu um erro! Por favor, experimente outra forma de contacto.';
		}
		scheduleReset();
	}
</script>

<section class="me-section" id="hire-me" style:display={visible ? 'block' : 'none'}>
	<div class="section-heading">
		<h2 class="section-title">CONECTE-ME</h2>
		<p class="section-description">Let's talk?</p>
		<div class="animated-bar"></div>
	</div>
	<div class="section-inner">
		<div class="contact-section">
			<div class="contact-form">
				<form onsubmit={handleSubmit}>
					<h4>Deixe-me um recado!</h4>
					<div class="form-inner">
						<input class="form-control form-45-control" type="text" name="name" placeholder="Nome" required />
						<input class="form-control form-45-control" type="email" name="email" placeholder="Correio electrónico" required />
						<input class="form-control form-100-control" type="text" name="subject" placeholder="Assunto" required />
						<textarea class="form-control form-100-control" name="message" placeholder="Mensagem" rows="5" required></textarea>
						<button class="form-submit {btnState}" type="submit" {disabled}>{btnText}</button>
						<p class="contact-feedback {feedbackState}" style:display={feedback ? 'block' : 'none'}>{feedback}</p>
					</div>
				</form>
			</div>
			<div class="contact-info">
				<h4>Como me encontrar?</h4>
				<p class="info-desc">Estou comprometido em oferecer soluções criativas em todas as áreas em que atuo. Sinta-se à vontade para entrar em contato comigo!</p>
				<ul class="info-list">
					<li>
						<div class="info-list-inner">
							<span class="info-icon"><span class="css-icon location-icon"></span></span>
							<div class="info-details">
								<h6 class="info-type">Localização</h6>
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
								<h6 class="info-type">Celular</h6>
								<span class="info-value"><a href="tel:+258877603501" class="tel-link" target="_blank">+258 87 76 03 501</a></span>
							</div>
						</div>
					</li>
					<li>
						<div class="info-list-inner">
							<span class="info-icon"><span class="css-icon email-icon"></span></span>
							<div class="info-details">
								<h6 class="info-type">Correio electrónico</h6>
								<span class="info-value"><a href="mailto:admin@tudocomlizzyman.com" class="email-link">admin@tudocomlizzyman.com</a></span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
