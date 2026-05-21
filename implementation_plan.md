# Finalized Multipage Architecture & Design Plan

Based on your latest feedback, here is the updated plan to restructure the website into a multipage platform while strictly adhering to a high-performance, minimalist design philosophy.

> [!IMPORTANT]
> **User Review Required**
> Please review this final plan. If everything—from the page structure to the flat design approach—looks perfect, just say "Ok" and I will start building!

## 1. Design & Aesthetic Philosophy
- **High Performance & Minimalist**: We are stripping out all heavy CSS effects. There will be **zero gradients**, no glassmorphism, and no performance-heavy blurs.
- **Flat UI**: The design will rely on clean, solid background colors (e.g., crisp white, charcoal black, and solid flat gold). 
- **Simple Typography**: No extra text styling or complex fonts that delay rendering. The text will be clean, readable, and lightning-fast to load.
- **Lightweight**: This approach ensures the website loads instantly, even on slow mobile connections, prioritizing user experience and SEO.

## 2. Global Layout Changes (All Pages)
- **Sidebar Navigation**: The top header will be completely replaced by a fixed, solid-color sidebar on the left side of the screen containing the Academy Logo, main navigation links, and social icons.
- **Pre-Footer Contact Form**: A simple, fast-loading contact form will be placed just above the footer on every page.
- **Redesigned Footer**: A clean, structured footer containing your logo, contact details, location, and quick links.

## 3. Page Structure & Details

### 🏠 Home (`index.html`)
- **Hero Slider**: A lightweight JavaScript slider cycling through clean images and clear text.
- **Content**: Brief "Why Us" summary, 2 Featured Pricing Packages, and Testimonials.

### 📖 About Us (`about.html`)
- **Purpose**: A clean page detailing the history, mission, vision, and teaching methodology.

### 🏷️ Packages (`packages.html`)
- **Structure**: Inspired exactly by `quranlearnacademy.com/packages/`.
- **Content**: 
  - Exactly **3 Pricing Packages** displayed with clean, flat borders.
  - **Multi-Currency Tabs** (UK, USA, Australia, PK) built with vanilla JS so users can instantly swap pricing currencies without reloading.
  - A simple "Sponsor a Child" or "Discount Policy" text section below.

### ⬇️ Downloads (`downloads.html`)
- **Structure**: Inspired by `quranlearnacademy.com/downloads/`.
- **Content**: A fast, text-focused list (or simple grid) of downloadable resources (Para 1: Alif Lam Meem, Para 2: Sayaqool, Noorani Qaida, etc.) with straightforward "Download" buttons.

### 📞 Contact Us (`contact.html`)
- **Purpose**: Deep contact information, an optional map, and a simple FAQ text list.

## 4. Execution Plan
If you approve this final structure and design approach:
1. **Remove Heavy CSS**: I will clean out all gradients, glassmorphism, and complex shadows from `styles.css` to achieve the flat design.
2. **Build the Skeleton**: Create the HTML for the sidebar, pre-footer, and footer.
3. **Generate Pages**: Build the 5 distinct `.html` files and inject the shared skeleton.
4. **Implement Features**: Add the lightweight Hero Slider and the Multi-Currency Tabs.
