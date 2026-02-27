# Contact form – SMTP2GO + Cloudflare setup checklist

Use this to confirm everything is correct when the contact form isn’t sending email.

---

## 1. SMTP2GO

- [ ] **Domain authenticated**  
  In SMTP2GO: domain `cheapheadsets.com.au` is added and shows as **Verified** (SPF + DKIM in your DNS).

- [ ] **Sender address**  
  Sender is `cheapheadsets@circlebc.com.au` (SMTP username in SMTP2GO). Ensure this address is verified/allowed in SMTP2GO.

- [ ] **API key**  
  You have an API key from SMTP2GO (Settings → API Keys or similar).  
  Copy the key; you’ll add it in Cloudflare (step 2). No password or other secret is needed.

---

## 2. Cloudflare Pages – Variables and Secrets

- [ ] **Project**  
  Cloudflare Dashboard → **Workers & Pages** → **Pages** → your **cheapheadsets** project.

- [ ] **Environment variable**  
  - Go to **Settings** → **Variables and Secrets** (or **Environment variables**).  
  - Under **Production** (and **Preview** if you test there):  
    - **Variable name (key):** exactly `SMTP2GO_API_KEY` (case-sensitive).  
    - **Value:** your SMTP2GO API key.  
  - Save.  
  - If you use **Encrypt** / **Secret**, that’s fine; the Function reads it the same way.

- [ ] **Redeploy after changing variables**  
  After adding or changing variables, trigger a new deployment (e.g. **Deployments** → **Retry deployment** or push a small commit) so the new value is used.

---

## 3. Repo and deployment

- [ ] **Function file**  
  The repo contains `functions/contact.js` (at the root of the repo, not inside another folder).

- [ ] **Form action**  
  In `contact.html`, the form has:
  - `action="/contact"`
  - `method="POST"`

- [ ] **Build settings**  
  For a static site with Functions, **Build command** can be empty and **Build output directory** is usually `/` or the root. The important part is that the Git repo is connected and the `functions/` folder is in the same repo so Cloudflare can see it.

- [ ] **Latest code deployed**  
  After a `git push`, check **Deployments** and wait for the latest deployment to succeed. Then test the form again.

---

## 4. Test the form

- [ ] Open **https://www.cheapheadsets.com.au/contact.html** (or your live URL).
- [ ] Fill Name, Phone, Email, Description and submit.
- [ ] **Success:** You see “Thank you. Your enquiry has been sent…” and both `telco@circlebc.com.au` and `david.debono@circlebc.com.au` receive the email.
- [ ] **If you see an error message:**  
  - “Email not configured” → `SMTP2GO_API_KEY` is missing or wrong name in Cloudflare (step 2).  
  - “Failed to send email” or another message → Check SMTP2GO dashboard (Activity / Logs) for that send attempt; fix sender/domain or API key as needed.

---

## 5. Quick reference – what the Function expects

| Item | Value |
|------|--------|
| Cloudflare env var name | `SMTP2GO_API_KEY` |
| Form POST URL | `/contact` (same origin as the site) |
| Sender | `Cheap Headsets <cheapheadsets@circlebc.com.au>` |
| Recipients | `telco@circlebc.com.au`, `david.debono@circlebc.com.au` |
| Reply-To | Set from the form’s Email field |

If any of these were changed in code, the checklist above still applies; only the values in the table would differ.
