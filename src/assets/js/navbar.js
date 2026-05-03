// AInvirion island navbar — scroll morph + hamburger
// Per ~/code/AINVIRION/ainvirion_com/assets/js/app.js (canonical pattern):
// 1. Measure fit-content width with morph class temporarily applied
// 2. Cache as --island-scroll-width custom property
// 3. Guard initial render with .navbar--no-transition + double rAF
// 4. Re-measure on resize (debounced) and after fonts load
// 5. Toggle body.scrolled-past-hero based on scrollY > hero * 0.6

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initScrollMorph();
    initHamburger();
    initLangDropdown();
  });

  // === Scroll morph ===
  function initScrollMorph() {
    var nav = document.querySelector('.navbar--island');
    var island = document.querySelector('.navbar-island');
    var hero = document.querySelector('.hero');
    if (!nav || !island) return;

    var morphClass = 'scrolled-past-hero';
    var isScrolled = false;

    nav.classList.add('navbar--no-transition');

    function measureIslandWidth() {
      island.style.removeProperty('--island-scroll-width');
      var wasScrolled = document.body.classList.contains(morphClass);
      if (!wasScrolled) document.body.classList.add(morphClass);
      var w = island.getBoundingClientRect().width;
      if (!wasScrolled) document.body.classList.remove(morphClass);
      island.style.setProperty('--island-scroll-width', w + 'px');
    }

    measureIslandWidth();

    // Re-measure once fonts have loaded (text width is final then)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        nav.classList.add('navbar--no-transition');
        measureIslandWidth();
        void island.offsetHeight;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            nav.classList.remove('navbar--no-transition');
          });
        });
      });
    }

    if (!hero) {
      document.body.classList.add(morphClass);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          nav.classList.remove('navbar--no-transition');
        });
      });
      return;
    }

    function checkScroll() {
      var pastHero = window.scrollY > hero.offsetHeight * 0.6;
      if (pastHero !== isScrolled) {
        isScrolled = pastHero;
        document.body.classList.toggle(morphClass, isScrolled);
      }
    }

    checkScroll();

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        nav.classList.remove('navbar--no-transition');
      });
    });

    window.addEventListener('scroll', checkScroll, { passive: true });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        nav.classList.add('navbar--no-transition');
        measureIslandWidth();
        void island.offsetHeight;
        nav.classList.remove('navbar--no-transition');
      }, 150);
    });
  }

  // === Hamburger menu ===
  function initHamburger() {
    var hamburger = document.querySelector('.island-hamburger');
    var navbarIsland = document.querySelector('.navbar-island');
    var menu = document.getElementById('island-menu');
    if (!hamburger || !navbarIsland || !menu) return;

    var openLabel = hamburger.getAttribute('aria-label') || 'Open menu';
    var closeLabel = openLabel.indexOf('Close') >= 0
      ? openLabel
      : (openLabel.indexOf('Open') >= 0 ? openLabel.replace('Open', 'Close') : 'Close menu');

    function open() {
      navbarIsland.classList.add('island-open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', closeLabel);
      menu.setAttribute('aria-hidden', 'false');
    }
    function close() {
      navbarIsland.classList.remove('island-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', openLabel);
      menu.setAttribute('aria-hidden', 'true');
    }
    function toggle() {
      if (navbarIsland.classList.contains('island-open')) close();
      else open();
    }

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });

    document.addEventListener('click', function (e) {
      if (!navbarIsland.classList.contains('island-open')) return;
      if (navbarIsland.contains(e.target)) return;
      close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navbarIsland.classList.contains('island-open')) {
        close();
        hamburger.focus();
      }
    });

    Array.prototype.forEach.call(menu.querySelectorAll('a'), function (a) {
      a.addEventListener('click', close);
    });
  }

  // === Language dropdown (close on outside click / Escape) ===
  function initLangDropdown() {
    var dropdown = document.querySelector('.lang-switcher');
    if (!dropdown) return;

    document.addEventListener('click', function (e) {
      if (!dropdown.open) return;
      if (dropdown.contains(e.target)) return;
      dropdown.open = false;
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dropdown.open) {
        dropdown.open = false;
        var summary = dropdown.querySelector('summary');
        if (summary) summary.focus();
      }
    });
  }
})();
