(function () {
  const siteDomain = window.location.hostname;

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    const url = new URL(href, window.location.origin);
    const isExternal = url.hostname !== siteDomain;

    if (isExternal) {
      link.classList.add('external-link');

      const srText = document.createElement('span');
      srText.className = 'sr-only';
      srText.textContent = '(opens in new tab)';
      link.appendChild(srText);

      if (!link.hasAttribute('rel')) link.setAttribute('rel', 'noopener');
      if (!link.hasAttribute('target')) link.setAttribute('target', '_blank');
    } else {
      link.classList.add('internal-link');

      fetch(url.href)
        .then(response => response.text())
        .then(html => {
          const doc = new DOMParser().parseFromString(html, "text/html");
          const pageTitle = doc.querySelector("title")?.innerText || url.pathname;

          const srText = document.createElement('span');
          srText.className = 'sr-only';
          srText.textContent = `(navigates to ${pageTitle})`;
          link.appendChild(srText);

          link.setAttribute('data-title', pageTitle);
        })
        .catch(() => {
          link.setAttribute('data-title', url.pathname);
        });
    }
  });
})();
