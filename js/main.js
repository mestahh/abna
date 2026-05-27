/**
 * ABNA – A Biztosítás Nem Alszik!
 * Main JavaScript (jQuery)
 */

$(function () {

  /* ============================================================
     NAVBAR – scroll behaviour
     ============================================================ */
  var $navbar = $('.navbar');

  function syncNavbar() {
    if ($(window).scrollTop() > 50) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }
  }
  syncNavbar();
  $(window).on('scroll.navbar', syncNavbar);


  /* ============================================================
     NAVBAR – mobile toggle
     ============================================================ */
  var $toggle = $('.navbar-toggle');
  var $mobile = $('.navbar-mobile');

  $toggle.on('click', function () {
    var isOpen = $toggle.hasClass('open');
    $toggle.toggleClass('open', !isOpen);
    $mobile.toggleClass('open', !isOpen);
    $('body').toggleClass('no-scroll', !isOpen);
  });

  // Close when any mobile link is tapped
  $mobile.find('a').on('click', function () {
    $toggle.removeClass('open');
    $mobile.removeClass('open');
    $('body').removeClass('no-scroll');
  });

  // Close on outside click
  $(document).on('click', function (e) {
    if ($mobile.hasClass('open') &&
        !$(e.target).closest('.navbar-mobile, .navbar-toggle').length) {
      $toggle.removeClass('open');
      $mobile.removeClass('open');
      $('body').removeClass('no-scroll');
    }
  });


  /* ============================================================
     SMOOTH SCROLL – internal anchors
     ============================================================ */
  $(document).on('click', 'a[href^="#"]', function (e) {
    var target = $(this).attr('href');
    if (!target || target === '#' || target.indexOf('#!') === 0) return;
    var $target = $(target);
    if (!$target.length) return;
    e.preventDefault();
    var navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--navbar-h'),
      10
    ) || 80;
    $('html, body').animate(
      { scrollTop: $target.offset().top - navH - 16 },
      600
    );
  });


  /* ============================================================
     ACTIVE NAV LINK – auto-detect by current page filename
     ============================================================ */
  var page = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  if (page === '') page = 'index.html';

  $('.navbar-link, .navbar-mobile-link').each(function () {
    var href = ($(this).attr('href') || '').split('/').pop();
    if (href === page) {
      $(this).addClass('active');
    }
  });


  /* ============================================================
     SCROLL ANIMATIONS – .fade-up elements
     ============================================================ */
  function revealFadeUps() {
    var winBottom = $(window).scrollTop() + $(window).height();
    $('.fade-up:not(.visible)').each(function () {
      if ($(this).offset().top < winBottom - 60) {
        $(this).addClass('visible');
      }
    });
  }
  revealFadeUps();
  $(window).on('scroll.anim', revealFadeUps);


  /* ============================================================
     STATS COUNTER ANIMATION
     ============================================================ */
  var countersRun = false;

  function tryCounters() {
    if (countersRun) return;
    var $stats = $('.stats');
    if (!$stats.length) return;

    var winBottom = $(window).scrollTop() + $(window).height();
    if ($stats.offset().top > winBottom - 50) return;

    countersRun = true;
    $(window).off('scroll.counters');

    $('.stat-num[data-target]').each(function () {
      var $el      = $(this);
      var target   = parseInt($el.data('target'), 10);
      var suffix   = $el.data('suffix') || '';
      var duration = 1800;
      var startTs  = null;

      function tick(ts) {
        if (!startTs) startTs = ts;
        var progress = Math.min((ts - startTs) / duration, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        $el.text(Math.floor(eased * target) + suffix);
        if (progress < 1) requestAnimationFrame(tick);
        else $el.text(target + suffix);
      }
      requestAnimationFrame(tick);
    });
  }

  tryCounters();
  $(window).on('scroll.counters', tryCounters);


  /* ============================================================
     BODY NO-SCROLL helper (used by mobile menu)
     ============================================================ */
  $('<style>.no-scroll{overflow:hidden}</style>').appendTo('head');


  /* ============================================================
     FORM SUBMISSION — mailto fallback (no backend needed)
     ============================================================
     To use Formspree instead:
       1. Sign up free at https://formspree.io
       2. Create a form and copy your endpoint URL
       3. Set the <form> action attribute to that URL
       4. Remove the JS intercept below for that form
     ============================================================ */
  $('form.abna-form').on('submit', function (e) {
    e.preventDefault();

    var $form    = $(this);
    var $fields  = $form.find('.form-input, .form-select, .form-textarea');
    var $consent = $form.find('input[name="consent"]');
    var valid    = true;

    // Basic required-field highlight
    $fields.each(function () {
      if ($(this).prop('required') && !$(this).val().trim()) {
        $(this).css('border-color', '#ef4444');
        valid = false;
      } else {
        $(this).css('border-color', '');
      }
    });

    if ($consent.length && !$consent.is(':checked')) {
      $consent.closest('.form-consent').css('border-color', '#ef4444');
      valid = false;
    } else {
      $consent.closest('.form-consent').css('border-color', '');
    }

    if (!valid) return;

    // Build mailto body from all named fields
    var lines  = [];
    var subject = $form.data('subject') || 'Érdeklődés – ABNA Biztosítás';

    $form.find('[name]').each(function () {
      var $el   = $(this);
      var name  = $el.attr('name');
      var label = $el.closest('.form-group').find('.form-label').first().text().replace('*','').trim();
      var val   = '';

      if ($el.is('select')) {
        val = $el.find('option:selected').text();
      } else if ($el.is('input[type="radio"]')) {
        if ($el.is(':checked')) val = $el.val();
        else return; // skip unchecked radios
      } else if ($el.is('input[type="checkbox"]')) {
        val = $el.is(':checked') ? 'Igen' : 'Nem';
        if (name === 'consent') return; // skip consent in body
      } else {
        val = $el.val().trim();
      }

      if (val && label) lines.push(label + ': ' + val);
    });

    var body    = lines.join('\n') + '\n\n— Elküldve az abna.hu weboldallal';
    var mailto  = 'mailto:hello@abna.hu'
                + '?subject=' + encodeURIComponent(subject)
                + '&body='    + encodeURIComponent(body);

    // Open mail client
    window.location.href = mailto;

    // Show success state
    $form.fadeOut(300, function () {
      $form.closest('.form-card').find('.form-success').addClass('visible').hide().fadeIn(400);
    });
  });

  // Re-enable border on input
  $(document).on('input change', 'form.abna-form .form-input, form.abna-form .form-select, form.abna-form .form-textarea', function () {
    $(this).css('border-color', '');
  });

});
