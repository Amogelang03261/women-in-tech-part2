window.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for same-page links
  document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const [page, hash] = href.split('#');

      if (!page || page === window.location.pathname.split('/').pop()) {
        // Same-page scroll
        if (hash) {
          e.preventDefault();
          const target = document.getElementById(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, '#' + hash);
          }
        }
      } else if (hash) {
        // Cross-page: store hash
        sessionStorage.setItem('scrollToHash', hash);
      }
    });
  });

  // Cross-page scroll on load
  const storedHash = sessionStorage.getItem('scrollToHash');
  if (storedHash) {
    setTimeout(() => {
      const target = document.getElementById(storedHash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, null, '#' + storedHash);
      }
      sessionStorage.removeItem('scrollToHash');
    }, 50); // small delay to ensure rendering
  }

  // Scroll if URL already has a hash
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    setTimeout(() => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }
});
