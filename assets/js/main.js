(() => {
  'use strict';
  document.documentElement.classList.add('v2-ready');
  const v2Style = document.createElement('link'); v2Style.rel = 'stylesheet'; v2Style.href = 'assets/css/v2.css'; document.head.append(v2Style);
  const root = document.documentElement;
  const toggle = document.querySelector('.theme');
  const key = 'focus-theme';
  const paint = (theme) => {
    root.dataset.theme = theme;
    if (!toggle) return;
    const icon = toggle.querySelector('span');
    if (icon) icon.textContent = theme === 'dark' ? '☾' : '☼';
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  };
  paint(root.dataset.theme || 'light');
  toggle?.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    paint(theme);
    try { localStorage.setItem(key, theme); } catch (_) {}
  });

  // Change this value to your real launch date.
  const launchDate = new Date('2026-10-18T12:00:00');
  if (Number.isNaN(launchDate.getTime())) launchDate.setTime(Date.now());
  let timerId;
  const tick = () => {
    const remaining = Math.max(0, launchDate.getTime() - Date.now());
    const values = { days: Math.floor(remaining / 864e5), hours: Math.floor(remaining / 36e5) % 24, minutes: Math.floor(remaining / 6e4) % 60, seconds: Math.floor(remaining / 1e3) % 60 };
    Object.entries(values).forEach(([name, value]) => {
      const node = document.querySelector(`[data-time="${name}"]`);
      if (node) node.textContent = String(value).padStart(2, '0');
    });
    if (remaining === 0) {
      window.clearInterval(timerId);
      const label = document.querySelector('.eyebrow');
      if (label) label.textContent = 'We’re live';
    }
  };
  tick(); timerId = window.setInterval(tick, 1000);

  const form = document.querySelector('form');
  if (form) form.noValidate = true;
  form?.querySelector('input[type="email"]')?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); form.requestSubmit(); } });
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const message = form.querySelector('[role="status"]');
    if (!input || !message) return;
    const valid = input.checkValidity();
    input.setAttribute('aria-invalid', String(!valid));
    message.textContent = valid ? 'Demo form validated successfully. Connect this template to your email provider for production use.' : 'Please enter a valid email address.';
    if (!valid) input.focus();
  });
})();
