(function () {
  // Sticky nav background on scroll
  var nav = document.querySelector('[data-nav]');
  var onScroll = function () { nav && nav.classList.toggle('is-scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var toggle = document.querySelector('[data-nav-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Reveal on scroll
  var revealed = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Creative services: tabs with auto-rotation
  var list = document.querySelector('[data-services]');
  if (list) {
    var tabs = list.querySelectorAll('[data-service]');
    var visuals = document.querySelectorAll('[data-service-visual]');
    var current = 0;
    var timer;
    var activate = function (i) {
      current = i;
      tabs.forEach(function (t, j) { t.classList.toggle('is-active', j === i); t.setAttribute('aria-selected', String(j === i)); });
      visuals.forEach(function (v, j) { v.classList.toggle('is-active', j === i); });
    };
    var start = function () {
      clearInterval(timer);
      timer = setInterval(function () { activate((current + 1) % tabs.length); }, 4500);
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(i); start(); });
      t.addEventListener('mouseenter', function () { activate(i); clearInterval(timer); });
      t.addEventListener('mouseleave', start);
    });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
  }

  // Contact form
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    var button = form.querySelector('button[type=submit]');
    var clearErrors = function () {
      form.querySelectorAll('[data-error]').forEach(function (el) { el.textContent = ''; });
      form.querySelectorAll('.is-invalid').forEach(function (el) { el.classList.remove('is-invalid'); });
      status.textContent = '';
      status.className = 'form-status';
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();
      var data = Object.fromEntries(new FormData(form).entries());
      button.disabled = true;
      button.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (res) { return res.json().then(function (body) { return { ok: res.ok, body: body }; }); })
        .then(function (r) {
          if (r.ok && r.body.ok) {
            form.reset();
            status.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
            status.classList.add('is-ok');
            return;
          }
          var errors = (r.body && r.body.errors) || {};
          Object.keys(errors).forEach(function (key) {
            var slot = form.querySelector('[data-error="' + key + '"]');
            var field = form.querySelector('[name="' + key + '"]');
            if (slot) slot.textContent = errors[key];
            if (field) field.classList.add('is-invalid');
          });
          status.textContent = errors.form || 'Please check the highlighted fields.';
          status.classList.add('is-error');
        })
        .catch(function () {
          status.textContent = 'Network error. Please try again or email me directly.';
          status.classList.add('is-error');
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = 'Send message';
        });
    });
  }
})();
