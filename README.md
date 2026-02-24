# Cheap Headsets (cheapheadsets.com.au)

Static marketing site for cheapheadsets.com.au. Lead funnel for budget headsets (Bluetooth, wireless, USB, telephone) with links to purchase via partner. Built for **Cloudflare Pages** with automatic deploys on push.

- **Repo:** https://github.com/daviddebono/Cheapheadsets.git  
- **Live:** Served from this repo (plain HTML/CSS/JS, no framework).

---

## Editing locally

1. Clone the repo and open the folder in your editor.
2. Edit HTML, CSS or JS as needed. Main files:
   - `index.html` — Homepage
   - `about.html`, `products.html`, `benefits.html`, `case-studies.html`, `contact.html`, `privacy.html`, `terms.html`
   - `products/*.html` — Product category pages
   - `locations/*.html` — Location pages
   - `blog/index.html` and `blog/*.html` — Blog listing and articles
   - `css/style.css` — Styles
   - `js/main.js` — Mobile menu, form handling
3. Preview: open `index.html` in a browser, or use a local server (e.g. `npx serve .`).

---

## Product images

Product category images are loaded from the `assets/` folder. Place these files in `assets/` (same folder as `logo.svg`) with these exact names so they match the product pages:

- `bluetooth-headsets.webp` — Bluetooth Headsets page + products overview card
- `wireless-headphones.webp` — Wireless Headphones page + products overview card
- `usb-headsets.webp` — USB Headsets page + products overview card
- `telephone-headsets.webp` — Telephone Headsets page + products overview card

The site expects **WebP** format. If you use JPG or PNG instead, change the `.webp` extension to `.jpg` or `.png` in `products.html` and in each of the four files in `products/`.

**If images don’t show:**  
1. Confirm all four files exist in `assets/` with **exact** names: `bluetooth-headsets.webp`, `wireless-headphones.webp`, `usb-headsets.webp`, `telephone-headsets.webp` (all lowercase, hyphen).  
2. Add each file explicitly and push: `git add assets/usb-headsets.webp` (and the others), then `git commit -m "Add product images"`, then `git push origin main`.  
3. On GitHub, open the repo → `assets` folder and confirm **all four** .webp files appear (if one is missing, it wasn’t committed).  
4. If one image still fails: re-save that file as a new WebP (in case it’s corrupted), ensure the filename has no extra spaces or different characters, then add and push again.  
5. After pushing, clear Cloudflare cache (Cloudflare dashboard → Caching → Purge Everything) so the new file is served.

---

## Deploying

- **Cloudflare Pages:** Push to `main` on GitHub. Cloudflare builds and deploys automatically.
- No build step required; the site is static HTML/CSS/JS.

---

## Form endpoints (Formspree)

Forms submit via **Formspree** so submissions go to your email without exposing it on the site.

1. Sign up at [formspree.io](https://formspree.io) (free tier is fine).
2. Create **two forms** in Formspree:
   - One for **enquiry** (contact form)
   - One for **newsletter**
3. Get each form’s endpoint URL (e.g. `https://formspree.io/f/xxxxxxxx`).
4. In **`contact.html`** replace the placeholders:
   - **Enquiry form:** Find `action="https://formspree.io/f/YOUR_FORMSPREE_ENQUIRY_ID"` and replace `YOUR_FORMSPREE_ENQUIRY_ID` with your enquiry form ID (or paste the full endpoint URL).
   - **Newsletter form:** Find `action="https://formspree.io/f/YOUR_FORMSPREE_NEWSLETTER_ID"` and replace `YOUR_FORMSPREE_NEWSLETTER_ID` with your newsletter form ID (or full URL).
5. Formspree will send submissions to the email you set in the Formspree dashboard (e.g. Daviddebono81@gmail.com). Do **not** put your Gmail in the HTML.

---

## Adding new blog posts

1. Create a new HTML file in `blog/` with a slug filename, e.g. `blog/my-new-article-title.html`.
2. Copy structure from an existing post (e.g. `blog/alternatives-to-jabra-evolve-20-headset.html`): same header, nav, footer, and article layout. Use relative paths `../` for assets, CSS, JS and internal links.
3. Add the new post to `blog/index.html`: add a new `<li>` with a link to `my-new-article-title.html` and a short description.
4. **Update the sitemap:** Open `sitemap.xml` and add a new `<url>` block for the new post, e.g.:
   ```xml
   <url><loc>https://www.cheapheadsets.com.au/blog/my-new-article-title.html</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
   ```

---

## Site structure

```
/index.html              Home (hero, CTAs)
/about.html              About Us
/products.html           Products overview
/products/bluetooth-headsets.html
/products/wireless-headphones.html
/products/usb-headsets.html
/products/telephone-headsets.html
/benefits.html           Benefits + ROI
/case-studies.html       Illustrative case studies
/blog/index.html         Blog listing
/blog/*.html             Individual articles
/contact.html            Enquiry + newsletter forms
/privacy.html            Privacy policy
/terms.html              Terms of use
/locations/sydney.html   (and Melbourne, Brisbane, Adelaide, Canberra, Hobart)
/assets/                 Images, logo
/css/style.css           Main stylesheet
/js/main.js              Nav, forms
/sitemap.xml             Sitemap for SEO
/robots.txt              Points to sitemap
```

---

## SEO and tech

- Titles, meta descriptions and canonical URLs are set on each page.
- `sitemap.xml` lists all main, product, location and blog pages.
- `robots.txt` allows all and references the sitemap.
- Organisation schema is on the homepage.
- Design: corporate, dark/neutral palette with orange accent; responsive; accessible.

---

## Notes

- **No backend:** Forms use Formspree; no server-side code.
- **Australian spelling** used in content.
- **Telco Broker:** Product/range links point to telcobroker.com.au; no need to mention the partner in body copy except where relevant (e.g. “our partner can assist”).
- **Plan assessment:** See `PLAN-ASSESSMENT-AND-UPGRADE.md` for the critical assessment of the original plan and the upgraded architecture.
