function onDownloadResumeHandler(value){
  if(value==="1")
  {
    window.open("docs/ali-shan-resume.pdf")
  }
  else if(value==="2")
  {
    window.open("docs/ali-shan-cv.pdf")
  }
  document.getElementById("select-download-resume").value=0;
  
}

document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("header-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  var sectionIds = ["hello", "profiles", "skills", "experience", "courses"];
  var navLinks = document.querySelectorAll(".site-nav__link[href^='#']");

  /** Document Y (px) of each section’s top edge — constant while scrolling; remeasure on resize. */
  var sectionDocTops = [];

  function documentYTop(el) {
    var rect = el.getBoundingClientRect();
    return rect.top + window.pageYOffset;
  }

  function measureSectionTops() {
    sectionDocTops = sectionIds.map(function (id) {
      var el = document.getElementById(id);
      return el ? documentYTop(el) : 0;
    });
  }

  function headerActivationOffset() {
    return header ? Math.ceil(header.getBoundingClientRect().height) + 12 : 88;
  }

  /**
   * Scrollspy: the active block is the last section whose start is at or above the
   * “activation line” (scroll position + header height). Works with smooth scrolling
   * because scrollY updates continuously and section tops are fixed in document space.
   */
  function getActiveSectionIdFromScroll() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var yLine = scrollY + headerActivationOffset();
    var docEl = document.documentElement;
    var active = sectionIds[0];

    for (var i = 0; i < sectionIds.length; i++) {
      var top = sectionDocTops[i];
      if (top <= yLine) {
        active = sectionIds[i];
      }
    }

    var nearBottom = scrollY + window.innerHeight >= docEl.scrollHeight - 2;
    if (nearBottom) {
      active = sectionIds[sectionIds.length - 1];
    }

    return active;
  }

  function applyActiveNavById(activeId) {
    if (sectionIds.indexOf(activeId) === -1) return;
    navLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      var isActive = href === "#" + activeId;
      a.classList.toggle("site-nav__link--active", isActive);
      if (isActive) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  var navRaf = 0;
  function syncNavFromScroll() {
    if (navRaf) return;
    navRaf = window.requestAnimationFrame(function () {
      navRaf = 0;
      applyActiveNavById(getActiveSectionIdFromScroll());
    });
  }

  measureSectionTops();
  applyActiveNavById(getActiveSectionIdFromScroll());

  window.addEventListener("scroll", syncNavFromScroll, { passive: true });
  window.addEventListener("resize", function () {
    measureSectionTops();
    syncNavFromScroll();
  });

  document.addEventListener("scrollend", function () {
    measureSectionTops();
    syncNavFromScroll();
  }, { passive: true });

  navLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      var id = href.slice(1);
      if (sectionIds.indexOf(id) === -1) return;
      applyActiveNavById(id);
    });
  });

  window.addEventListener("hashchange", function () {
    var h = location.hash;
    if (h && h.length > 1) {
      var id = h.slice(1);
      if (sectionIds.indexOf(id) !== -1) {
        applyActiveNavById(id);
      }
    }
    measureSectionTops();
    syncNavFromScroll();
  });

  if (location.hash && location.hash.length > 1) {
    var startId = location.hash.slice(1);
    if (sectionIds.indexOf(startId) !== -1) {
      applyActiveNavById(startId);
    }
  }

  window.addEventListener("load", function () {
    measureSectionTops();
    syncNavFromScroll();
  });

  if ("fonts" in document) {
    document.fonts.ready.then(function () {
      measureSectionTops();
      syncNavFromScroll();
    });
  }
});
