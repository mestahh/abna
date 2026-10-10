/**
 * ABNA – A Biztosítás Nem Alszik!
 * Site behaviour, no dependencies.
 */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------
     Footer year
     ------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });


  /* ------------------------------------------------------------
     Navbar: solid background once the page scrolls
     ------------------------------------------------------------ */
  var navbar = document.querySelector('[data-navbar]');

  function syncNavbar() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  if (navbar) {
    syncNavbar();
    window.addEventListener('scroll', syncNavbar, { passive: true });
  }


  /* ------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------ */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
    navbar.classList.toggle('is-open', open);
    document.body.classList.toggle('no-scroll', open);
    if (open) {
      menu.hidden = false;
      // Next frame so the opening transition runs from the closed state.
      requestAnimationFrame(function () { menu.classList.add('is-open'); });
    } else {
      menu.classList.remove('is-open');
      menu.hidden = true;
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (toggle.getAttribute('aria-expanded') === 'true' && !e.target.closest('[data-navbar]')) {
        setMenu(false);
      }
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }


  /* ------------------------------------------------------------
     Scroll reveal. Content is visible without JS; the .js class on
     <html> opts elements into the reveal, and anything already in
     view when the page loads is shown immediately.
     ------------------------------------------------------------ */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Hero entrance runs once the fonts are ready, so lines don't reflow mid-animation.
  var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  ready.then(function () { doc.classList.add('is-loaded'); });
  // Never leave the hero hidden if fonts stall.
  setTimeout(function () { doc.classList.add('is-loaded'); }, 1500);


  /* ------------------------------------------------------------
     Hero numbers count up once, quickly, from a visible default.
     ------------------------------------------------------------ */
  var counters = document.querySelectorAll('[data-count]');

  if (counters.length && !reduceMotion.matches) {
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var duration = 1400;
      var start = null;
      el.textContent = '0';

      function tick(ts) {
        if (start === null) start = ts;
        var t = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(2, -10 * t); // expo out
        el.textContent = t < 1 ? Math.round(eased * target) : target;
        if (t < 1) requestAnimationFrame(tick);
      }
      ready.then(function () { setTimeout(function () { requestAnimationFrame(tick); }, 500); });
    });
  }


  /* ------------------------------------------------------------
     Forms
     By default a submitted form opens the visitor's mail client with
     the answers filled in (no backend needed). To receive submissions
     directly instead, set the form's action to a form-handling
     endpoint (e.g. Formspree) – it is then sent with fetch().
     ------------------------------------------------------------ */
  var MAIL_TO = 'hello@abna.hu';

  function fieldLabel(field) {
    var group = field.closest('.form-group');
    var label = group && group.querySelector('.form-label');
    return label ? label.textContent.replace('*', '').trim() : field.name;
  }

  function errorFor(field) {
    if (field.validity.valueMissing) {
      return field.type === 'checkbox'
        ? 'Az elküldéshez kérjük, fogadja el az adatkezelési tájékoztatót.'
        : 'Ezt a mezőt kérjük, töltse ki.';
    }
    if (field.validity.typeMismatch && field.type === 'email') return 'Kérjük, érvényes e-mail címet adjon meg (pl. nev@pelda.hu).';
    if (field.validity.rangeUnderflow) return 'A legkisebb elfogadott érték: ' + field.min + '.';
    if (field.validity.rangeOverflow) return 'A legnagyobb elfogadott érték: ' + field.max + '.';
    if (field.validity.badInput) return 'Kérjük, számot adjon meg.';
    return '';
  }

  function showError(field, message) {
    var holder = field.closest('.form-group, .form-consent');
    var id = (field.id || field.name) + '-error';
    var el = document.getElementById(id);
    if (!message) {
      field.removeAttribute('aria-invalid');
      if (el) el.remove();
      if (holder) holder.classList.remove('has-error');
      return;
    }
    field.setAttribute('aria-invalid', 'true');
    if (holder) holder.classList.add('has-error');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-error';
      el.id = id;
      holder.appendChild(el);
      var described = (field.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      if (described.indexOf(id) === -1) described.push(id);
      field.setAttribute('aria-describedby', described.join(' '));
    }
    el.textContent = message;
  }

  function collect(form) {
    var lines = [];
    var seen = {};
    form.querySelectorAll('[name]').forEach(function (el) {
      if (el.name === 'consent' || el.name === '_gotcha' || seen[el.name]) return;
      var value = '';
      if (el.type === 'radio') {
        var checked = form.querySelector('input[name="' + el.name + '"]:checked');
        seen[el.name] = true;
        value = checked ? checked.value : '';
      } else if (el.type === 'checkbox') {
        value = el.checked ? 'Igen' : '';
      } else if (el.tagName === 'SELECT') {
        value = el.value ? el.options[el.selectedIndex].text : '';
      } else {
        value = el.value.trim();
      }
      if (value) lines.push(fieldLabel(el) + ': ' + value);
    });
    return lines;
  }

  function showSuccess(form, viaMail) {
    var card = form.closest('.form-card');
    var success = card.querySelector('.form-success');
    if (viaMail) {
      var title = success.querySelector('.form-success-title');
      if (title) title.textContent = 'Már csak el kell küldenie!';
      var text = success.querySelector('[data-success-text]');
      if (text) {
        text.textContent = 'Megnyílt levelezőprogramja az elkészített üzenettel – kérjük, ott küldje el. ' +
          'Ha nem nyílt meg, hívjon minket, vagy írjon a ' + MAIL_TO + ' címre.';
      }
    }
    // On the mail-app path the visitor still has to press send there, so keep their answers on screen.
    if (!viaMail) form.hidden = true;
    success.classList.toggle('is-notice', viaMail);
    success.hidden = false;
    success.focus();
    card.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }

  document.querySelectorAll('form.abna-form').forEach(function (form) {
    var fields = form.querySelectorAll('input, select, textarea');
    var submit = form.querySelector('[type="submit"]');

    fields.forEach(function (field) {
      // Validate on leave, then live once the visitor has seen an error.
      field.addEventListener('blur', function () {
        if (field.type !== 'radio' && (field.value || field.hasAttribute('aria-invalid'))) {
          showError(field, errorFor(field));
        }
      });
      field.addEventListener('input', function () {
        if (field.hasAttribute('aria-invalid')) showError(field, errorFor(field));
      });
      field.addEventListener('change', function () {
        if (field.hasAttribute('aria-invalid')) showError(field, errorFor(field));
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;
      fields.forEach(function (field) {
        if (field.type === 'radio') return;
        var message = errorFor(field);
        showError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var subject = form.getAttribute('data-subject') || 'Érdeklődés – ABNA Biztosítás';
      var endpoint = form.getAttribute('action');

      if (endpoint) {
        submit.disabled = true;
        submit.classList.add('is-loading');
        fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (res) {
          if (!res.ok) throw new Error(res.status);
          showSuccess(form, false);
        }).catch(function () {
          var status = form.querySelector('.form-status');
          status.hidden = false;
          status.textContent = 'Az üzenetet most nem sikerült elküldeni. Kérjük, próbálja újra, ' +
            'vagy hívjon minket: +36 30 360 3390.';
        }).finally(function () {
          submit.disabled = false;
          submit.classList.remove('is-loading');
        });
        return;
      }

      var body = collect(form).join('\n') + '\n\n— Elküldve az abna.hu weboldalról';
      window.location.href = 'mailto:' + MAIL_TO +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
      showSuccess(form, true);
    });
  });
})();
