document.addEventListener("DOMContentLoaded", () => {
  'use strict';

  // div.loader (before full loading "show loader message")
  gsap.to(".loader .message", {
    opacity: 1,
    duration: 0.5
  });

  // particlesJS (a lightweight custom particle creation)
  particlesJS.load('particles-js', Math.random() < 0.5 ? 'assets/json/particles.json' : 'assets/json/linked_particles.json');

  class TxtRotate {
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.isDeleting = false;
      this.tick();
    }

    tick() {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];
      this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);

      this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

      let delta = 200 - Math.random() * 100;
      delta = this.isDeleting ? delta / 2 : delta;

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 100;
      }

      setTimeout(() => this.tick(), delta);
    }
  }

  const elements = document.getElementsByClassName('txt-rotate');
  for (const element of elements) {
    const toRotate = element.getAttribute('data-rotate');
    const period = element.getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(element, JSON.parse(toRotate), period);
    }
  }

  // Navigations
  const about_me = document.querySelector('.nav-me #open-about-me'),
    portfolio = document.querySelector('.nav-me #open-portfolio'),
    introspection = document.querySelector('.nav-me #open-introspection'),
    hire_me = document.querySelector('.nav-me #open-hire-me'),
    links = [
      { id: 'open-about-me', show: '.me-section#about-me' },
      { id: 'open-portfolio', show: '.me-section#portfolio' },
      { id: 'open-introspection', show: '.me-section#introspection' },
      { id: 'open-hire-me', show: '.me-section#hire-me' },
    ];

  links.forEach(link => {
    document.getElementById(link.id).addEventListener('click', function () {
      openSection(link.show);
    });
  });

  function openSection(showSelector) {
    gsap.to('.header', { duration: 0, display: 'none', delay: 0.7 });
    gsap.to('.header', { duration: 0, y: '-100%', delay: 0.7 });
    gsap.to('.breaker', { duration: 0, display: 'block' });

    gsap.to('.hero', { duration: 0, display: 'none' });
    gsap.to('.me-section#about-me', { duration: 0, display: 'none' });
    gsap.to('.me-section#portfolio', { duration: 0, display: 'none' });
    gsap.to('.me-section#introspection', { duration: 0, display: 'none' });
    gsap.to('.me-section#hire-me', { duration: 0, display: 'none' });

    gsap.to(showSelector, { duration: 0, display: 'block', delay: 0.7 });
    gsap.to('.breaker', { duration: 0, display: 'none', delay: 2 });
    gsap.to('.header', { duration: 0, display: 'flex', delay: 2 });
  }

  document.querySelectorAll('.bar').forEach(function (element) {
    element.addEventListener('click', function () {
      gsap.to('.header', { duration: 0.6, y: 0 });
    });
  });

  document.querySelectorAll('.x-bar').forEach(function (element) {
    element.addEventListener('click', function () {
      gsap.to('.me-section#about-me', { duration: 0, display: 'none' });
      gsap.to('.me-section#portfolio', { duration: 0, display: 'none' });
      gsap.to('.me-section#introspection', { duration: 0, display: 'none' });
      gsap.to('.me-section#hire-me', { duration: 0, display: 'none' });
      gsap.to('.hero', { duration: 0, display: 'block' });
      gsap.to('.header', { duration: 0.6, y: "-100%" });
    });
  });

  // Simulating page load completion
  setTimeout(() => {
    gsap.to(".loader", {
      opacity: 0,
      duration: 0.1,
      onComplete: () => {
        document.querySelector(".loader").classList.add("DOMContentLoaded");
      }
    });
  }, 3000);
});
