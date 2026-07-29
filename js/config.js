/* =========================================================================
   PORTFOLIO CONFIG
   -------------------------------------------------------------------------
   Everything a person would want to change lives here: text, links, and
   EVERY image on the site. Leave an image value as an empty string ''
   to keep the hand-drawn CSS/SVG placeholder instead of a real photo.
   ========================================================================= */

window.PORTFOLIO_CONFIG = {

  meta: {
    title: "GRENDY AGUSTI — Certified Frontend Dumbass",
    description: "Radical solutions to boring digital problems. Portfolio of Grendy Agusti, frontend developer.",
    // Browser tab icon. Empty = generated star-mark favicon.
    favicon: ""
  },

  /* ---------------------------------------------------------------------
     IMAGES — the ONE place to swap every picture on the site.
     Accepts any image URL / relative path. Leave "" for the CSS placeholder.
  --------------------------------------------------------------------- */
  images: {
    logoMark:            "img/logo.jpeg",   // small badge in nav, ~80x80
    heroPortrait:         "img/grendy.jpg",   // hero side sticker image, ~500x600
    aboutIllustration:    "",   // about/manifesto section image, ~400x500
    contactIllustration:  "",   // contact section image, ~400x400
    footerStamp:          ""    // tiny footer sticker, ~120x120
  },

  brand: {
    name: "Grendy Agusti",
    initials: "GA",
    role: "Frontend Developer",
    location: "Balitar, ID"
  },

  defaultLanguage: "en",
  languages: [
    { code: "en", label: "English" },
    { code: "id", label: "Bahasa" }
  ],

  accentColors: [
    "#FF6F61",
    "#4ECDC4",
    "#FFC312",
    "#2C3A47",
    "#F5F6FA"
  ],

  translations: {
    id: {
      meta: {
        title: "GR — Certified Frontend Dumbass",
        description: "Ngubah hal digital yang boring jadi sesuatu yang ngegas. Portofolio Grendy Agusti, frontend dev."
      },
      nav: [
        { label: "Kerjaan", href: "#work" },
        { label: "Tentang", href: "#about" },
        { label: "Kontak", href: "#contact" }
      ],
      hero: {
        kicker: "BATCH No. 002 — KODE 100% ABSTRAK",
        titleLines: ["GRENDY", "AGUSTI"],
        tagline: "Bikin solusi digital aneh yang nggak ngebosenin.",
        subtext: "Bikin UI yang nyentrik dan nendang buat brand yang males ngeblend. No corporate vibes.",
        ctaPrimary: { label: "Liat Kerjaan", href: "#work" },
        ctaSecondary: { label: "Kirim DM", href: "#contact" },
        marqueeText: "100% RETARDED • ZERO CORPORATE FADES • LAZYASS-PROGRAMMER • VANILLA JS ONLY • NO FRAMEWORK ADDITIVES • BRUTALIST BY DESIGN"
      },
      manifesto: {
        kicker: "INFO GIZI",
        title: "Bahan-Bahan Radikal",
        subtitleLabel: "Porsi:",
        subtitleText: "1 portofolio. Porsi tiap proyek beda-beda.",
        principlesTitle: "Rules",
        ingredients: [
          { label: "HTML", value: "" },
          { label: "CSS", value: "" },
          { label: "JavaScript", value: "" },
        ],
        principles: [
          "Fungsi dulu, gaya nomer dua",
          "lek lemot loadingnya, nggak dikirim.",
          "Aksesibilitas itu wajib, bukan aksesoris.",
          "Setiap piksel harus kerasa dibuat, bukan kebetulan.",
          "Bosen = bahaya, ojo dijarno wae."
        ]
      },
      contact: {
        kicker: "RECYCLING STATION",
        heading: "Kirim Pesanmu",
        subtext: "Masukin aja ide mu di sini, bakal ku bales. Estimasi bales: 1–2 hari kerja. Santai.",
        fields: {
          name: "Nama Anda",
          email: "Email Anda",
          message: "Bahas apa nih?"
        },
        submitLabel: "Kirim Sekarang",
        stampTop: "SAPA",
        stampBottom: "DONG ✶"
      },
      footer: {
        backToTop: "Balik ke atas ↑"
      },
      messages: {
        submitSuccess: "✶ Beres! bakal ku bales dalam 1–2 hari kerja."
      }
    }
  },

  nav: [
    { label: "Work",      href: "#work" },
    { label: "Manifesto",  href: "#about" },
    { label: "Contact",   href: "#contact" }
  ],

  hero: {
    kicker: "BATCH No. 002 — 100% ABSTRACT CODE",
    titleLines: ["GRENDY", "AGUSTI"],
    tagline: "Stupid solutions to boring digital problems.",
    subtext: "I build loud, sturdy, hyper-tactile interfaces for brands who refuse to blend in. No templates. No corporate fades. Just concentrate.",
    ctaPrimary:   { label: "Inspect The Work", href: "#work" },
    ctaSecondary: { label: "Deposit A Message", href: "#contact" },
    marqueeText: " ZERO CORPORATE FADES • LAZYASS-PROGRAMMER • VANILLA JS ONLY • NO FRAMEWORK ADDITIVES • BRUTALIST BY DESIGN • ",
    marqueeRepeat: 4
  },

  /* ---------------------------------------------------------------------
     PROJECTS — each renders as a sticker / bottle-label card.
     "size" accepts: "wide" | "tall" | "" (regular) to control the
     uneven crate-style grid.
  --------------------------------------------------------------------- */
  projects: [
    {
      id: "p1",
      title: "RPL 2 Class Website",
      batch: "BATCH 01",
      year: "2026",
      volume: "",
      description: "Our own class website that had been a project for months. Done by multiple jobless student of XI RPL 2",
      tech: ["Vanilla JS", "CSS Grid"],
      image: "img/web.png",
      link: "https://xirpl2smkbrantas-website.vercel.app/",
      size: "wide",
      color: "pink"
    },
    {
      id: "p5",
      title: "Parent Bouquet Shop",
      batch: "BATCH 02",
      year: "2026",
      volume: "NET WT 420KB",
      description: "A project i started to promote my mom bouquet shop. not finished yet.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "img/buket.png",
      link: "#",
      size: "wide",
      color: "lime"
    },
    {
      id: "p3",
      title: "Landing Page Toge Production",
      batch: "BATCH 03",
      year: "2026",
      volume: "NET WT 310KB",
      description: "An assignment to create a landing page. i choose toge production.",
      tech: ["HTML", "CSS"],
      image: "img/landing.png",
      link: "https://drive.google.com/drive/folders/1WA-0xtVuj2vODOM_cZhSO9rmrPRsxZuY?usp=drive_link",
      size: "tall",
      color: "forest"
    },
    {
      id: "p3",
      title: "Mock College Web",
      batch: "BATCH 04",
      year: "2026",
      volume: "",
      description: "An assignment to create a mockup college web with bare html. absolutely no CSS.",
      tech: ["HTML"],
      image: "img/pens.png",
      link: "https://drive.google.com/drive/folders/1bpweu4MydQRAZfWk9Kh_59HthEP0GM4o?usp=drive_link",
      size: "tall",
      color: "forest"
    },

  ],

  manifesto: {
    kicker: "NUTRITION FACTS",
    title: "Radical Ingredients",
    subtitle: "Serving size: 1 (one) portfolio. Amount per project may vary.",
    ingredients: [
      { label: "HTML",        value: "" },
      { label: "CSS",   value: "" },
      { label: "JavaScript",     value: "" },
    ],
    principlesTitle: "Core Principles",
    principles: [
      "Function first, decoration with purpose.",
      "If it doesn't load fast, it doesn't ship.",
      "Accessibility is not a garnish, it's an ingredient.",
      "Every pixel should feel handled, not generated.",
      "Boring is the only real risk."
    ]
  },

  contact: {
    kicker: "RECYCLING STATION",
    heading: "Deposit Your Message",
    subtext: "Return empty ideas here for a full refund of your inbox's boredom. Response time: 1–2 business days, glass fully rinsed.",
    email: "grendy.xpplg2@gmail.comm",
    formAction: "https://formspree.io/f/mjgnjbkr",
    fields: {
      name: "Your Name",
      email: "Your Email",
      message: "What are we brewing?"
    },
    submitLabel: "Deposit Now",
    stampTop: "SAY",
    stampBottom: "HI ✶",
    social: [
      { label: "GitHub",   href: "https://github.com/grendot-coder" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/grendy-arvel-putra-agusti-803366384/" },
      { label: "Facebook",href: "https://twitter.com" },
    ]
  },

  footer: {
    text: "Brewed by stain on the wall. quite the lazy guy © 2026 Grendy Agusti",
    backToTop: "Back To Top ↑"
  }
};
