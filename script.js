// Minimal JS: year stamp + active nav highlighting
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const sections = [...document.querySelectorAll('section[id]')];
  const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = null;
    for (const s of sections) {
      if (s.offsetTop <= y) current = s.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  setActive();
  window.addEventListener('scroll', setActive, {passive:true});
});

// Handle Stories form submission without leaving the page
const storiesForm = document.querySelector('#share-story form');
const storiesStatus = document.querySelector('.stories-status');

if (storiesForm) {
  storiesForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Stop page reload

    storiesStatus.textContent = 'Sending…';

    try {
      const formData = new FormData(storiesForm);

      const response = await fetch(storiesForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        storiesStatus.textContent = 'Thank you. Your story has been sent.';
        storiesForm.reset();
      } else {
        storiesStatus.textContent = 'Something went wrong. Please try again.';
      }
    } catch (error) {
      storiesStatus.textContent = 'Network error. Please try again.';
    }
  });
}

