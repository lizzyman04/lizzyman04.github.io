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
