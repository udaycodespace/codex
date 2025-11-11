// Udayverse small JS: carousel toggle, year, and form validation
(function(){
  // Update footer year
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Carousel pause/play
  const toggleBtn = document.getElementById('carouselToggle');
  const carouselEl = document.getElementById('heroCarousel');
  if(toggleBtn && carouselEl){
    const carousel = new bootstrap.Carousel(carouselEl, { interval: 5000, ride: 'carousel' });
    let paused = false;
    toggleBtn.addEventListener('click', () => {
      if(paused){ carousel.cycle(); toggleBtn.setAttribute('aria-pressed','false'); toggleBtn.innerHTML = '<i class="bi bi-pause-fill" aria-hidden="true"></i><span class="visually-hidden">Pause</span>'; }
      else { carousel.pause(); toggleBtn.setAttribute('aria-pressed','true'); toggleBtn.innerHTML = '<i class="bi bi-play-fill" aria-hidden="true"></i><span class="visually-hidden">Play</span>'; }
      paused = !paused;
    });
  }

  // Contact form validation with visible errors + Netlify-friendly submit
  const form = document.getElementById('contactForm');
  if(form){
    const successAlert = document.getElementById('successAlert');

    function setValidity(el, valid){
      el.classList.toggle('is-invalid', !valid);
      el.setAttribute('aria-invalid', String(!valid));
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const subject = form.querySelector('#subject');
      const message = form.querySelector('#message');

      setValidity(name, name.value.trim().length > 0);
      setValidity(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
      setValidity(subject, subject.value.trim().length > 0);
      setValidity(message, message.value.trim().length > 0);

      valid = ![name, email, subject, message].some(el => el.classList.contains('is-invalid'));

      if(!valid){ return; }

      // Build FormData for Netlify and mock fetch for local preview
      const data = new FormData(form);

      try{
        // If hosted on Netlify, this POST will be intercepted.
        await fetch('/', { method:'POST', body: data });
      }catch(err){
        // Ignore network errors in local preview.
        console.warn('Mock submit:', err);
      }

      form.reset();
      if(successAlert){
        successAlert.classList.remove('d-none');
        successAlert.focus?.();
        setTimeout(() => successAlert.classList.add('d-none'), 4000);
      }
    });

    // Live validation on blur
    form.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('blur', () => {
        if(el.id === 'email'){
          setValidity(el, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
        }else{
          setValidity(el, el.value.trim().length > 0);
        }
      });
    });
  }
})();