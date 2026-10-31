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

  // Case study annotations: line each callout up with its pin and draw an arrow
  var annos = document.querySelectorAll('[data-anno]');
  if (annos.length) {
    var NS = 'http://www.w3.org/2000/svg';
    var stacked = window.matchMedia('(max-width: 860px)');
    var svgEl = function (name, attrs, parent) {
      var el = document.createElementNS(NS, name);
      Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
      parent.appendChild(el);
      return el;
    };

    var layout = function (anno) {
      var svg = anno.querySelector('.anno__lines');
      if (!svg) return;
      svg.innerHTML = '';
      var notes = anno.querySelectorAll('.anno__note');
      if (stacked.matches) {
        anno.classList.remove('is-placed');
        notes.forEach(function (n) { n.style.top = ''; });
        return;
      }
      anno.classList.add('is-placed');
      var box = anno.getBoundingClientRect();
      // Page zoom on large screens: rects are scaled, offsets and style values are not
      var scale = box.width / anno.offsetWidth || 1;
      svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);

      anno.querySelectorAll('.anno__notes').forEach(function (col) {
        var left = col.classList.contains('anno__notes--left');
        var colTop = col.getBoundingClientRect().top;
        var gap = 16;
        var items = Array.prototype.map.call(col.children, function (note) {
          var num = note.querySelector('.anno__num');
          var pin = anno.querySelector('[data-pin="' + note.dataset.note + '"]');
          var p = pin.getBoundingClientRect();
          var anchor = num.offsetTop + num.offsetHeight / 2;
          return { note: note, num: num, pin: p, h: note.offsetHeight, top: (p.top + p.height / 2 - colTop) / scale - anchor };
        }).sort(function (a, b) { return a.top - b.top; });

        // Keep callouts in pin order without overlapping or leaving the column
        var y = 0;
        items.forEach(function (it) { it.top = Math.max(it.top, y); y = it.top + it.h + gap; });
        var limit = col.offsetHeight;
        for (var i = items.length - 1; i >= 0; i--) {
          items[i].top = Math.max(0, Math.min(items[i].top, limit - items[i].h));
          limit = items[i].top - gap;
        }

        items.forEach(function (it) {
          it.note.style.top = it.top + 'px';
          var n = it.num.getBoundingClientRect();
          var sx = (left ? n.right + 8 : n.left - 8) - box.left;
          var sy = n.top + n.height / 2 - box.top;
          var cx = it.pin.left + it.pin.width / 2 - box.left;
          var cy = it.pin.top + it.pin.height / 2 - box.top;
          var dx = cx - sx, dy = cy - sy, len = Math.sqrt(dx * dx + dy * dy) || 1;
          var ex = cx - dx / len * 17, ey = cy - dy / len * 17;
          var bend = Math.abs(ex - sx) * 0.45 * (left ? 1 : -1);
          var c2x = ex - bend, c2y = ey;
          var d = 'M' + sx + ' ' + sy + ' C' + (sx + bend) + ' ' + sy + ' ' + c2x + ' ' + c2y + ' ' + ex + ' ' + ey;
          var ux = ex - c2x, uy = ey - c2y, ul = Math.sqrt(ux * ux + uy * uy) || 1;
          ux /= ul; uy /= ul;
          var bx = ex - ux * 9, by = ey - uy * 9;
          var head = [ex, ey, bx - uy * 5, by + ux * 5, bx + uy * 5, by - ux * 5].join(' ');

          var g = svgEl('g', { 'data-for': it.note.dataset.note }, svg);
          svgEl('path', { d: d, class: 'casing' }, g);
          svgEl('path', { d: d, class: 'line' }, g);
          svgEl('polygon', { points: head, class: 'head' }, g);
        });
      });
    };

    var layoutAll = function () { annos.forEach(layout); };
    var queued = false;
    var schedule = function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; layoutAll(); });
    };

    annos.forEach(function (anno) {
      anno.querySelectorAll('img').forEach(function (img) { if (!img.complete) img.addEventListener('load', schedule); });

      // Hovering a callout or a pin highlights the pair
      var setActive = function (num) {
        anno.classList.toggle('has-active', num !== null);
        anno.querySelectorAll('[data-note], [data-pin], [data-for]').forEach(function (el) {
          var id = el.dataset.note || el.dataset.pin || el.dataset.for;
          el.classList.toggle('is-active', id === num);
        });
      };
      anno.querySelectorAll('[data-note], [data-pin]').forEach(function (el) {
        el.addEventListener('mouseenter', function () { setActive(el.dataset.note || el.dataset.pin); });
        el.addEventListener('mouseleave', function () { setActive(null); });
      });
    });

    layoutAll();
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    if (document.fonts) document.fonts.ready.then(schedule);
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
