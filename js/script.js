/* =========================================================================
   PORTFOLIO SCRIPT — vanilla JS, no dependencies.
   Reads window.PORTFOLIO_CONFIG and renders/wires up the whole page.
   ========================================================================= */
(function () {
  "use strict";

  var CFG = window.PORTFOLIO_CONFIG || {};
  var ACTIVE_LANG = CFG.defaultLanguage || "en";

  function getSavedLanguage() {
    try { return localStorage.getItem("portfolioLanguage"); } catch (e) { return null; }
  }

  function saveLanguage(lang) {
    try { localStorage.setItem("portfolioLanguage", lang); } catch (e) {}
  }

  function getTranslationObject() {
    return (CFG.translations || {})[ACTIVE_LANG] || {};
  }

  function translatePath(path) {
    var node = getTranslationObject();
    var parts = path.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (!node) return undefined;
      node = node[parts[i]];
    }
    return node;
  }

  function getSection(section) {
    var base = CFG[section];
    var trans = translatePath(section);
    if (trans === undefined) return base;
    if (!base || typeof base !== "object" || Array.isArray(base)) return trans;
    if (!trans || typeof trans !== "object" || Array.isArray(trans)) return trans;
    var merged = {};
    Object.keys(base).forEach(function (key) { merged[key] = base[key]; });
    Object.keys(trans).forEach(function (key) { merged[key] = trans[key]; });
    return merged;
  }

  function getLanguageLabel(code) {
    if (!CFG.languages || !CFG.languages.length) return code.toUpperCase();
    var item = CFG.languages.find(function (entry) { return entry.code === code; });
    return item ? item.label : code.toUpperCase();
  }

  function getNextLanguageCode() {
    if (!CFG.languages || !CFG.languages.length) return CFG.defaultLanguage || "en";
    var currentIndex = CFG.languages.findIndex(function (item) { return item.code === ACTIVE_LANG; });
    if (currentIndex === -1) return CFG.languages[0].code;
    return CFG.languages[(currentIndex + 1) % CFG.languages.length].code;
  }

  function applyAccentColors() {
    var colors = CFG.accentColors || [];
    var defaults = ["#FF41A4", "#CCFF00", "#0E3A20", "#1A1A1A", "#F3EFE4"];
    var root = document.documentElement;
    for (var i = 1; i <= 5; i++) {
      root.style.setProperty("--accent-" + i, colors[i - 1] || defaults[i - 1]);
    }
    root.style.setProperty("--pink", colors[0] || defaults[0]);
    root.style.setProperty("--lime", colors[1] || defaults[1]);
    root.style.setProperty("--forest", colors[2] || defaults[2]);
    root.style.setProperty("--charcoal", colors[3] || defaults[3]);
    root.style.setProperty("--paper", colors[4] || defaults[4]);
  }

  function setLanguage(lang) {
    if (!lang) lang = CFG.defaultLanguage || "en";
    if (CFG.languages && CFG.languages.length) {
      var valid = CFG.languages.some(function (item) { return item.code === lang; });
      if (!valid) lang = CFG.defaultLanguage || "en";
    }
    ACTIVE_LANG = lang;
    document.documentElement.lang = ACTIVE_LANG;
    saveLanguage(ACTIVE_LANG);
    var button = document.getElementById("lang-toggle-btn");
    if (button) button.textContent = getLanguageLabel(ACTIVE_LANG);

    setMeta();
    buildNav();
    buildMarquee();
    buildWorkGrid();
    buildManifesto();
    buildContact();
    buildFooter();
  }

  function buildLanguageSwitcher() {
    if (!CFG.languages || !CFG.languages.length) return;
    var header = document.querySelector(".nav-inner");
    if (!header) return;
    var existingWrap = document.querySelector(".lang-switch");
    var button = document.getElementById("lang-toggle-btn");
    if (!existingWrap) {
      existingWrap = el("div", { className: "lang-switch" });
      header.insertBefore(existingWrap, document.getElementById("nav-toggle"));
    }
    if (!button) {
      button = el("button", { className: "lang-button", text: getLanguageLabel(ACTIVE_LANG), attrs: { id: "lang-toggle-btn", type: "button", "aria-label": "Toggle language" } });
      existingWrap.appendChild(button);
    }
    button.textContent = getLanguageLabel(ACTIVE_LANG);
    button.addEventListener("click", function () { setLanguage(getNextLanguageCode()); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyAccentColors();
    buildLanguageSwitcher();
    setLanguage(getSavedLanguage() || CFG.defaultLanguage || "en");
    setImages();
    wireNavToggle();
    wireContactForm();
    wireBackToTop();
    wireCursor();
    wireRevealOnScroll();
  });

  /* ----------------------------- helpers ----------------------------- */
  function el(tag, opts) {
    var node = document.createElement(tag);
    opts = opts || {};
    if (opts.className) node.className = opts.className;
    if (opts.text) node.textContent = opts.text;
    if (opts.html) node.innerHTML = opts.html;
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (k) {
        node.setAttribute(k, opts.attrs[k]);
      });
    }
    return node;
  }

  /* ------------------------------- meta ------------------------------- */
  function setMeta() {
    var meta = getSection("meta");
    if (!meta) return;
    if (meta.title) document.title = meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc && meta.description) desc.setAttribute("content", meta.description);

    if (meta.favicon) {
      var link = document.querySelector('link[rel="icon"]') || el("link", { attrs: { rel: "icon" } });
      link.setAttribute("href", meta.favicon);
      document.head.appendChild(link);
    }
  }

  /* --------------------- swap every image from config -------------------- */
  function setImages() {
    var imgs = CFG.images || {};

    applyImage(document.querySelector(".logo-badge__img"), document.querySelector(".logo-badge__text"), imgs.logoMark);
    applyImage(document.querySelector(".hero-portrait__img"), document.querySelector(".hero-portrait__placeholder"), imgs.heroPortrait);
    applyImage(document.querySelector(".about-media__img"), document.querySelector(".about-media__placeholder"), imgs.aboutIllustration);
    applyImage(document.getElementById("footer-stamp-img"), document.querySelector(".footer-stamp-svg"), imgs.footerStamp);

    // contact illustration only has a placeholder (no config key by default,
    // but honor it if someone adds contactIllustration to config.images)
    if (imgs.contactIllustration) {
      var mediaWrap = document.querySelector(".contact-media");
      if (mediaWrap) {
        var ph = mediaWrap.querySelector(".contact-media__placeholder");
        var img = el("img", { className: "contact-media__img", attrs: { alt: "" } });
        img.src = imgs.contactIllustration;
        img.style.border = "var(--border-w-lg) solid var(--bg)";
        img.style.boxShadow = "8px 8px 0 0 var(--charcoal)";
        img.style.aspectRatio = "1";
        img.style.objectFit = "cover";
        img.style.width = "100%";
        if (ph) ph.replaceWith(img);
      }
    }

    function applyImage(imgNode, fallbackNode, src) {
      if (!src) return; // keep CSS/SVG placeholder
      if (imgNode) {
        imgNode.src = src;
        imgNode.removeAttribute("hidden");
        imgNode.alt = "";
      }
      if (fallbackNode) fallbackNode.setAttribute("hidden", "");
    }
  }

  /* -------------------------------- nav -------------------------------- */
  function buildNav() {
    var wrap = document.getElementById("nav-links");
    if (!wrap) return;
    wrap.innerHTML = "";
    var items = getSection("nav") || [];
    items.forEach(function (item) {
      var a = el("a", { attrs: { href: item.href } });
      a.appendChild(el("span", { text: item.label }));
      wrap.appendChild(a);
    });
  }

  function wireNavToggle() {
    var btn = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (!btn || !links) return;
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (event) {
      var anchor = event.target.closest("a");
      if (anchor) {
        links.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------ marquee ------------------------------ */
  function buildMarquee() {
    var track = document.getElementById("marquee-track");
    var hero = getSection("hero");
    if (!track || !hero) return;
    track.innerHTML = "";
    var text = hero.marqueeText || "";
    var repeat = (hero.marqueeRepeat || 4) * 2;
    for (var i = 0; i < repeat; i++) {
      track.appendChild(el("span", { text: text }));
    }
    var kicker = document.querySelector(".hero-kicker .tape");
    if (kicker && hero.kicker) kicker.textContent = hero.kicker;

    var t1 = document.querySelector(".hero-title__line--1");
    var t2 = document.querySelector(".hero-title__line--2");
    if (hero.titleLines && hero.titleLines.length === 2) {
      if (t1) t1.textContent = hero.titleLines[0];
      if (t2) t2.textContent = hero.titleLines[1];
    }
    var ctaP = document.querySelector(".hero-ctas .btn--pink");
    var ctaO = document.querySelector(".hero-ctas .btn--outline");
    if (ctaP && hero.ctaPrimary) { ctaP.textContent = hero.ctaPrimary.label; ctaP.href = hero.ctaPrimary.href; }
    if (ctaO && hero.ctaSecondary) { ctaO.textContent = hero.ctaSecondary.label; ctaO.href = hero.ctaSecondary.href; }
    var sub = document.querySelector(".hero-subtext");
    if (sub && hero.subtext) sub.textContent = hero.subtext;
  }

  /* ------------------------------ work grid ------------------------------ */
  function buildWorkGrid() {
    var grid = document.getElementById("work-grid");
    if (!grid || !CFG.projects) return;
    grid.innerHTML = "";

    CFG.projects.forEach(function (p) {
      var card = el("article", { className: "card" + (p.size ? " card--" + p.size : "") });
      card.setAttribute("data-color", p.color || "pink");

      var label = el("div", { className: "card__label" });
      label.appendChild(el("span", { text: (p.batch || "") + " · " + (p.year || "") }));
      label.appendChild(el("span", { text: p.volume || "" }));
      card.appendChild(label);

      var media = el("div", { className: "card__media" });
      if (p.image) {
        var img = el("img", { attrs: { alt: p.title || "" } });
        img.src = p.image;
        media.appendChild(img);
      } else {
        media.appendChild(buildCardPlaceholder(p));
      }
      card.appendChild(media);

      var body = el("div", { className: "card__body" });
      body.appendChild(el("h3", { className: "card__title", text: p.title || "" }));
      body.appendChild(el("p", { className: "card__desc", text: p.description || "" }));

      if (p.tech && p.tech.length) {
        var techWrap = el("div", { className: "card__tech" });
        p.tech.forEach(function (t) { techWrap.appendChild(el("span", { text: t })); });
        body.appendChild(techWrap);
      }

      var link = el("a", { className: "card__link", text: "Inspect Sample →", attrs: { href: p.link || "#" } });
      body.appendChild(link);

      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  function buildCardPlaceholder(p) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 400 220");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.classList.add("card__media-ph");

    var colors = { pink: "#FF41A4", lime: "#CCFF00", forest: "#0E3A20", charcoal: "#1A1A1A" };
    var base = colors[p.color] || "#FF41A4";

    var rect = document.createElementNS(ns, "rect");
    rect.setAttribute("width", "400"); rect.setAttribute("height", "220");
    rect.setAttribute("fill", base);
    svg.appendChild(rect);

    // diagonal stripes for texture
    for (var i = -4; i < 10; i++) {
      var line = document.createElementNS(ns, "line");
      line.setAttribute("x1", i * 60); line.setAttribute("y1", "0");
      line.setAttribute("x2", i * 60 + 220); line.setAttribute("y2", "220");
      line.setAttribute("stroke", "rgba(26,26,26,.12)");
      line.setAttribute("stroke-width", "18");
      svg.appendChild(line);
    }

    var circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", "200"); circle.setAttribute("cy", "110"); circle.setAttribute("r", "46");
    circle.setAttribute("fill", "#FDFBF7");
    circle.setAttribute("stroke", "#1A1A1A");
    circle.setAttribute("stroke-width", "4");
    svg.appendChild(circle);

    var text = document.createElementNS(ns, "text");
    text.setAttribute("x", "200"); text.setAttribute("y", "122");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-family", "'Archivo Black','Arial Black',sans-serif");
    text.setAttribute("font-size", "30");
    text.setAttribute("fill", "#1A1A1A");
    text.textContent = (p.title || "?").charAt(0);
    svg.appendChild(text);

    return svg;
  }

  /* ------------------------------ manifesto ------------------------------ */
  function buildManifesto() {
    var m = getSection("manifesto");
    if (!m) return;

    var kicker = document.querySelector("#about .section-kicker .tape");
    if (kicker && m.kicker) kicker.textContent = m.kicker;
    var title = document.querySelector("#about .about-copy .section-title");
    if (title && m.title) title.innerHTML = m.title;
    var head = document.querySelector(".nutrition-box__head");
    if (head) {
      var label = m.subtitleLabel || "Serving size:";
      var subtitleText = m.subtitleText || m.subtitle || "";
      head.innerHTML = "<strong>" + label + "</strong> " + subtitleText;
    }

    var list = document.getElementById("nutrition-list");
    if (list) {
      list.innerHTML = "";
      if (m.ingredients) {
        m.ingredients.forEach(function (item) {
          var li = el("li");
          var numeric = parseFloat(item.value) || 0;
          if (numeric === 0) li.setAttribute("data-zero", "");
          li.appendChild(el("strong", { text: item.label }));
          var bar = el("span", { className: "nutrition-bar" });
          var fill = el("span", { className: "nutrition-bar__fill" });
          fill.style.width = Math.min(numeric, 100) + "%";
          bar.appendChild(fill);
          li.appendChild(bar);
          li.appendChild(el("span", { text: item.value }));
          list.appendChild(li);
        });
      }
    }

    var pTitle = document.querySelector(".principles__title");
    if (pTitle && m.principlesTitle) pTitle.textContent = m.principlesTitle;

    var pList = document.getElementById("principles-list");
    if (pList) {
      pList.innerHTML = "";
      if (m.principles) {
        m.principles.forEach(function (text) {
          pList.appendChild(el("li", { text: text }));
        });
      }
    }
  }

  /* ------------------------------- contact ------------------------------- */
  function buildContact() {
    var c = getSection("contact");
    if (!c) return;

    var kicker = document.querySelector("#contact .section-kicker .tape");
    if (kicker && c.kicker) kicker.textContent = c.kicker;
    var title = document.querySelector("#contact .section-title");
    if (title && c.heading) title.innerHTML = c.heading.replace(/\s(\S+)$/, "<br>$1");
    var desc = document.querySelector("#contact .section-desc");
    if (desc && c.subtext) desc.textContent = c.subtext;

    var mailAddress = document.getElementById("mail-address");
    var mailLink = document.querySelector(".mail-stamp");
    if (c.email) {
      if (mailAddress) mailAddress.textContent = c.email;
      if (mailLink) mailLink.href = "mailto:" + c.email;
    }

    var contactForm = document.getElementById("contact-form");
    if (contactForm && c.formAction) {
      contactForm.setAttribute("action", c.formAction);
      contactForm.setAttribute("method", "POST");
    }

    if (c.fields) {
      setPlaceholder("field-name", c.fields.name);
      setPlaceholder("field-email", c.fields.email);
      setPlaceholder("field-message", c.fields.message);
    }
    var submitBtn = document.querySelector("#contact-form button[type=submit]");
    if (submitBtn && c.submitLabel) submitBtn.textContent = c.submitLabel;

    var stampLines = document.querySelectorAll(".mail-stamp__line");
    if (stampLines && stampLines.length) {
      if (c.stampTop && stampLines[0]) stampLines[0].textContent = c.stampTop;
      if (c.stampBottom && stampLines[1]) stampLines[1].textContent = c.stampBottom;
    }

    var socialWrap = document.getElementById("social-caps");
    if (socialWrap) {
      socialWrap.innerHTML = "";
      if (c.social) {
        c.social.forEach(function (s) {
          var a = el("a", { text: s.label, attrs: { href: s.href, target: "_blank", rel: "noopener" } });
          socialWrap.appendChild(a);
        });
      }
    }

    function setPlaceholder(id, val) {
      var node = document.getElementById(id);
      if (node && val) node.setAttribute("placeholder", val);
    }
  }

  function wireContactForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var c = getSection("contact") || {};
      var action = c.formAction || form.getAttribute("action") || "";
      var submitBtn = form.querySelector("button[type=submit]");
      var successMsg = translatePath("messages.submitSuccess") || "✶ Deposited! I'll write back within 1–2 business days.";
      var errorMsg = "Sorry, something went wrong. Please try again.";

      if (submitBtn) submitBtn.disabled = true;
      if (status) {
        status.textContent = "Sending...";
        status.classList.remove("is-success", "is-error");
      }

      function finish(success, message) {
        if (status) {
          status.textContent = message;
          status.classList.toggle("is-success", success);
          status.classList.toggle("is-error", !success);
        }
        if (submitBtn) submitBtn.disabled = false;
        if (success) {
          form.reset();
        }
      }

      if (!action) {
        return finish(true, successMsg);
      }

      var formData = new FormData(form);
      fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      })
        .then(function (response) {
          if (response.ok) return response.text();
          throw new Error("Network response was not ok");
        })
        .then(function () {
          finish(true, successMsg);
        })
        .catch(function () {
          finish(false, errorMsg);
        });
    });
  }

  /* -------------------------------- footer -------------------------------- */
  function buildFooter() {
    var f = getSection("footer");
    if (!f) return;
    var text = document.getElementById("footer-text");
    if (text && f.text) text.textContent = f.text;
    var top = document.getElementById("back-to-top");
    if (top && f.backToTop) top.textContent = f.backToTop;
  }

  function wireBackToTop() {
    var top = document.getElementById("back-to-top");
    if (!top) return;
    top.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------------------------------- cursor -------------------------------- */
  function wireCursor() {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
    });

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = "translate(" + ringX + "px," + ringY + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    var interactive = "a, button, input, textarea, .card, .btn";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(interactive)) ring.classList.add("is-active");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(interactive)) ring.classList.remove("is-active");
    });
  }

  /* --------------------------- reveal on scroll --------------------------- */
  function wireRevealOnScroll() {
    var targets = document.querySelectorAll(".card, .about-inner, .contact-grid");
    if (!("IntersectionObserver" in window) || !targets.length) return;

    targets.forEach(function (t) {
      t.style.opacity = "0";
      t.style.transform = (t.style.transform || "") + " translateY(14px)";
      t.style.transition = "opacity .35s steps(5), transform .35s steps(5)";
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = entry.target.style.transform.replace("translateY(14px)", "translateY(0)");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (t) { io.observe(t); });
  }
})();
