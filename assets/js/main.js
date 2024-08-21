document.addEventListener("DOMContentLoaded", () => {
  'use strict';

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
  const breaker = document.querySelector('.breaker'),
    links = [
      { id: 'open-about-me', show: '.me-section#about-me' },
      { id: 'open-portfolio', show: '.me-section#portfolio' },
      { id: 'open-introspection', show: '.me-section#introspection' },
      { id: 'open-hire-me', show: '.me-section#hire-me' },
    ],
    b_colors = ['#c70039', '#035aa6', '#04a777'],
    tl = gsap.timeline();

  let breaker_i = 0;

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

    breaker.style.backgroundColor = b_colors[breaker_i];
    breaker_i = (breaker_i + 1) % b_colors.length;
  }

  document.querySelectorAll('.bar').forEach(element => {
    element.addEventListener('click', () => {
      tl.to('.header', { duration: 0.6, y: 0 })
        .to(['.me-section#about-me', '.me-section#portfolio', '.me-section#introspection', '.me-section#hire-me'], {
          duration: 0, display: 'none'
        })
        .to('.hero', { duration: 0, display: 'block' }, "<");
    });
  });

  document.querySelectorAll('.back-to-home').forEach(function (element) {
    element.addEventListener('click', function () {
      gsap.to('.header', { duration: 0.6, y: "-100%" });
    });
  });

  // Fetch and resolve curriculum section
  fetchJSON('./assets/json/about.json', (json) => {

    const s_inner = document.querySelector('#about-me .section-inner');

    if (json.error) {
      s_inner.innerHTML = 'Oops... my resume decided to take a vacation!';
      console.error(json);
      return;
    }

    s_inner.querySelector('#json-introducing-presentation').textContent = json.introducing.presentation;
    s_inner.querySelector('#json-introducing-resume').textContent = json.introducing.resume;
    s_inner.querySelector('#json-introducing-name').textContent = json.introducing.name;
    s_inner.querySelector('#json-introducing-email').textContent = json.introducing.email;
    s_inner.querySelector('#json-introducing-email').setAttribute('href', `mailto:${json.introducing.email}`);
    s_inner.querySelector('#json-introducing-place_of_birth').textContent = json.introducing.place_of_birth;

    const [year_of_birth, month_of_birth, day_of_birth] = json.introducing.date_of_birth.split('-').map(Number);
    const age = new Date().getFullYear() - year_of_birth - (new Date() < new Date(new Date().getFullYear(), month_of_birth - 1, day_of_birth) ? 1 : 0);

    document.querySelector('#json-introducing-age').textContent = age + " anos";

    document.querySelector('#down-cv').addEventListener('click', function() {
      window.open(json.introducing.cv_link, '_blank');
  });  

    const skills_container = s_inner.querySelector('#skills'),
      abilities_container = s_inner.querySelector('#abilities'),
      education_container = s_inner.querySelector('#education'),
      experience_container = s_inner.querySelector('#experience');

    let htmlAbilities = '', htmlSkills = '', educationHTML = '', experienceHTML = '';

    for (const ability in json.abilities) {
      if (json.abilities.hasOwnProperty(ability)) {
        htmlAbilities += createAbilityItem(ability, json.abilities[ability].description, json.abilities[ability].imgSrc);
      }
    }

    function createAbilityItem(title, description, imgSrc) {
      return `
        <div class="ability">
          <div class="ability-img">
            <img src="${imgSrc}" alt="${title}">
          </div>
          <div class="ability-description">
            <h2>${title}</h2>
            <p>${description}</p>
          </div>
        </div>
      `;
    }

    abilities_container.innerHTML = htmlAbilities;

    for (const title in json.education) {
      if (json.education.hasOwnProperty(title)) {
        educationHTML += createParticipationItem(title, json.education[title]);
      }
    }

    for (const title in json.experience) {
      if (json.experience.hasOwnProperty(title)) {
        experienceHTML += createParticipationItem(title, json.experience[title]);
      }
    }

    function createParticipationItem(title, details) {
      return `
          <div class="participation-item">
              <span class="item-arrow"></span>
              <h5 class="item-title">${title}</h5>
              <span class="item-carrer">${details.carrer}</span>
              <span class="item-details">${details.institution || details.company}</span>
              <span class="item-location">${details.location} / ${details.dates}</span>
              <p class="item-description">${details.description}</p>
          </div>
      `;
    }

    education_container.innerHTML += educationHTML;
    experience_container.innerHTML += experienceHTML;

    for (const category in json.skills) {
      if (json.skills.hasOwnProperty(category)) {
        htmlSkills += createSkillCategory(category, json.skills[category]);
      }
    }

    function createSkillCategory(name, skills) {
      let skillsHTML = '';
      for (const skill in skills) {
        if (skills.hasOwnProperty(skill)) {
          skillsHTML += createSkillItem(skill, skills[skill]);
        }
      }

      return `
          <div class="skill-category">
              <div class="skill-category-header">${name} <span class="toggle-sign"></span></div>
              <div class="skill-list" style="height: 0; padding-top: 0; padding-bottom: 0;">
                  ${skillsHTML}
              </div>
          </div>
      `;
    }

    function createSkillItem(name, level) {
      return `
        <div class="skill-item">
            <div class="skill-name">${name}</div>
            <div class="skill-progress-bar">
                <div class="skill-progress" style="width: ${level};">
                  <div class="skill-level">${level}</div>
                </div>
            </div>
        </div>
    `;
    }

    skills_container.innerHTML = htmlSkills;

    document.querySelectorAll('.skill-category-header').forEach(header => {
      header.addEventListener('click', () => {
        const skillCategory = header.parentElement;
        const skillList = skillCategory.querySelector('.skill-list');
        const isOpen = skillCategory.classList.contains('open');

        document.querySelectorAll('.skill-category.open').forEach(cat => {
          if (cat !== skillCategory) {
            gsap.to(cat.querySelector('.skill-list'), { height: 0, paddingTop: 0, paddingBottom: 0, duration: 0.5 });
            cat.classList.remove('open');
          }
        });

        gsap.to(skillList, {
          height: isOpen ? 0 : skillList.scrollHeight + 40,
          paddingTop: isOpen ? 0 : 20,
          paddingBottom: isOpen ? 0 : 20,
          duration: 0.5
        });
        skillCategory.classList.toggle('open');
      });
    });
  });

  // Fetch and resolve portfolio section
  fetchJSON('./assets/json/portfolio.json', (json) => {

    const s_inner = document.querySelector('#portfolio .section-inner');

    if (json.error) {
      s_inner.innerHTML = 'Oops... my portfolio decided to take a vacation!';
      console.error(json);
      return;
    }

    const portfolio_container = s_inner.querySelector(".portfolio-container");

    let portfolioHTML = '';

    for (const project in json) {
      if (json.hasOwnProperty(project)) {
        portfolioHTML += createPortfolioItem(project, json[project]);
      }
    }

    function createPortfolioItem(name, details) {
      return `
          <div class="portfolio-item">
              <div class="portfolio-image">
                  <img src="${details.imageSrc}" alt="${name} project">
              </div>
              <div class="portfolio-text">
                  <h2>${name}</h2>
                  <p>${details.description}</p>
                  <ul class="portfolio-tech">
                      ${details.technologies.map(tech => `<li>${tech}</li>`).join('')}
                  </ul>
                  <div class="portfolio-buttons">
                      ${Object.entries(details.options).map(([label, link]) =>
        `<a href="${link}" target="_blank"><button><span>${label}</span></button></a>`
      ).join('')}
                      ${details.notices.length > 0 ? `<div class="portfolio-notices">${details.notices.map(notice => `<p>${notice}</p>`).join('')}</div>` : ''}
                  </div>
              </div>
          </div>
      `;
    }

    portfolio_container.innerHTML += portfolioHTML;
  });

  // Fetch and resolve introspection section
  fetchJSON('./assets/json/introspection.json', (json) => {

    const s_inner = document.querySelector('#introspection .section-inner');

    if (json.error) {
      s_inner.innerHTML = 'Oops... my way of seeing the world decided to take a vacation!';
      console.error(json);
      return;
    }

    const introspectionContainer = s_inner.querySelector('.introspection-container');
    let introspectionHTML = '';

    for (const topic in json) {
      if (json.hasOwnProperty(topic)) {
        introspectionHTML += createIntrospectionItem(topic, json[topic]);
      }
    }

    function createIntrospectionItem(title, details) {
        return `
            <div class="introspection-item">
                <div class="introspection-card">
                    <a class="introspection-image-link" href="${details.link}" target="_blank">
                        <img class="introspection-image" src="${details.imgSrc}" alt="${title} post">
                        <span class="introspection-date">${details.date}</span>
                    </a>
                    <div class="introspection-content">
                        <a class="introspection-title-link" href="${details.link}" target="_blank">
                            <h5 class="introspection-title">${title}</h5>
                        </a>
                        <p class="introspection-description">${details.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    introspectionContainer.innerHTML += introspectionHTML;
  });


  function fetchJSON(path, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            callback(JSON.parse(xhr.responseText));
          } catch {
            callback({ error: 'invalid json.' });
          }
        } else callback({ error: 'incorrect path.' });
      }
    };
    xhr.send();
  }

  // Contact form (leaving a message)

  const form = document.querySelector("form");
  const send_m = form.querySelector('button');
  const feedback_m = document.querySelector(".contact-feedback");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    send_m.textContent = "Aguarde...";
    send_m.classList.add("wait");
    send_m.disabled = true;

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        send_m.classList.remove("wait");
        const success = data.ok;
        send_m.textContent = success ? "Recado deixado!" : "Um erro ocorreu!";
        send_m.classList.add(success ? "success" : "error");
        feedback_m.classList.add(success ? "success" : "error");
        feedback_m.textContent = success ? "Obrigado pela sua mensagem. Ela foi enviada." : "Ocorreu um erro! Por favor, experimente outra forma de contacto.";
        feedback_m.style.display = "block";
        setTimeout(function () {
          send_m.textContent = 'Get in Touch';
          send_m.classList.remove(success ? "success" : "error");
          send_m.disabled = false;
          feedback_m.style.display = "none";
          feedback_m.classList.remove(success ? "success" : "error");
          feedback_m.textContent = "";
        }, 30000);
        if (success) form.reset();
      })
      .catch(error => {
        send_m.classList.remove("wait");
        send_m.textContent = "Um erro ocorreu!";
        send_m.classList.add("error");
        feedback_m.classList.add("error");
        feedback_m.textContent = "Ocorreu um erro! Por favor, experimente outra forma de contacto.";
        feedback_m.style.display = "block";
        setTimeout(function () {
          send_m.textContent = 'Get in Touch';
          send_m.classList.remove("error");
          send_m.disabled = false;
          feedback_m.style.display = "none";
          feedback_m.classList.remove("error");
          feedback_m.textContent = "";
        }, 30000);
      });
  });


  // Page load completion
  gsap.delayedCall(1.2, () => {
    gsap.to(".loader", {
      y: "-100%",
      rotateX: 90,
      duration: 1.3,
      ease: "power1.inOut",
      onComplete: () => {
        document.querySelector(".loader").classList.add("DOMContentLoaded");
      }
    });
  });
});
