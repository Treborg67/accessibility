(function () {
  const siteDomain = window.location.hostname;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    const url = new URL(href, window.location.origin);
    const isExternal = url.hostname !== siteDomain;

    if (isExternal) {
      link.classList.add('external-link');
      link.setAttribute('rel', 'noopener');
      link.setAttribute('target', '_blank');
      link.setAttribute('aria-label', link.textContent + ', opens in new tab or window');

      const icon = document.createElement('i');
      icon.className = 'fa-solid fa-arrow-up-right-from-square';
      icon.setAttribute('aria-hidden', 'true');
      link.appendChild(icon);

      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = '(opens in new tab or window)';
      link.appendChild(srText);

      // ✅ Give external links a tooltip too
      link.setAttribute('data-title', 'Opens in new tab or window');
    } else {
      link.classList.add('internal-link');
      const pageTitle = url.pathname;
      link.setAttribute('aria-label', link.textContent + ', navigates to ' + pageTitle);

      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = `(navigates to ${pageTitle})`;
      link.appendChild(srText);

      // ✅ Internal links tooltip
      link.setAttribute('data-title', `Navigates to ${pageTitle}`);
    }
  });
})();
