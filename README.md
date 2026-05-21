# Tilaawah Academy | Online Quran Education (Multipage Platform)

Welcome to the **Tilaawah Academy** website repository. This project is a modern, high-performance, and lightweight multipage website designed for an online Quran learning academy. It operates with a sleek sidebar navigation, flat minimalist styling, and a clean, responsive layout across all devices.

## 🌟 Project Overview

The website is structured into 5 distinct pages to provide an organized, premium user experience:

- **🏠 Home (`index.html`)**: Features a lightweight vanilla JavaScript hero slider, a brief "Why Choose Us" overview, two featured pricing packages, a student testimonial carousel, and the shared pre-footer contact form.
- **📖 About Us (`about.html`)**: Details the academy's history, mission, vision, and comprehensive teaching methodology.
- **🏷️ Our Packages (`packages.html`)**: An interactive pricing guide inspired by `quranlearnacademy.com/packages/`. It includes exactly 3 packages displayed in a clean, flat grid with USD ($) pricing plans. It also details refund, discount, and referral policies.
- **⬇️ Downloads (`downloads.html`)**: Inspired by `quranlearnacademy.com/downloads/`, this page houses a text-focused, lightning-fast download directory featuring all 30 Paras of the Holy Quran (in beautiful Arabic & English transliteration) alongside essential learning resources (Noorani Qaida, Tajweed Guide).
- **📞 Contact Us (`contact.html`)**: Provides a detailed inquiry form, quick communication info (Phone, Email, WhatsApp, Location), and a comprehensive FAQ accordion.

## 🎨 Design & Aesthetic Philosophy

Following a premium, high-performance design guideline:
- **No Gradients or Blurs**: Zero CSS gradients, glassmorphism, or heavy drop shadows. Relying entirely on crisp, solid flat backgrounds for a modern look and instant page load speeds.
- **Harmony in Palette**: Deep Charcoal Black (`#0F1113`, `#1C1E22`), clean Off-White (`#F9FAFB`), and flat Gold (`#C5A059`, `#DFBD7A`) reflecting respect and dignity.
- **Minimalist Typography**: Instantly-loaded typography using *Inter* for clean body copy and *Playfair Display* for elegant, classical headings.
- **Sidebar Navigation**: Completely replaces traditional headers with a persistent, stylish left-side nav menu that collapses into a lightweight slide-out menu on mobile.

## 🛠️ Technology Stack
- **HTML5**: Structured semantic pages, optimized for search engines (SEO best practices).
- **CSS3**: Flat custom styling system, CSS Grid and Flexbox layouts, lightweight micro-interactions.
- **JavaScript (Vanilla)**: High-performance logic for:
  - Sidebar toggle menu (mobile overlay and clicking outside to dismiss).
  - Fade-in Hero Slider.
  - Testimonial carousel sliding transitions.
  - Dropdown FAQ accordion panels.
  - Client-side form submissions.

## 📂 Project Structure

```text
website/
├── assets/
│   └── images/
│       ├── calligraphy_emblem.png
│       ├── child_quran.png
│       ├── hero_bg.png
│       └── mushaf_macro.png
├── css/
│   └── styles.css       # Core design system and page styles
├── js/
│   └── script.js        # Site-wide interactive features
├── index.html           # Homepage
├── about.html           # About Us & Teaching Methodology
├── packages.html        # USD packages pricing page
├── downloads.html       # Quran Paras & resources download directory
├── contact.html         # Contact details & FAQ accordion
└── README.md            # Project documentation (this file)
```

## 🚀 How to Run Locally

Since this website is built with pure web technologies, no build tools or servers are required:

1. Clone or download this repository.
2. Open the project folder.
3. Double-click on `index.html` to open it in your browser.
4. *Alternatively*, to test seamless page transitions and asset loading, run a local Python server:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your web browser.
