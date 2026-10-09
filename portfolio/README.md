# Mandadi Nikhit — portfolio

A fully static Vite + React + Tailwind CSS portfolio. The app has no backend. Inter and IBM Plex Mono are bundled from Fontsource packages at build time, so the deployed site makes no font-CDN requests. The `src/data/` files hold the editable site content and project cards.

## Requirements and local development

Install Node.js 24 LTS (the project also records its version in `.nvmrc`). From this folder:

1. Run `npm install` to install dependencies and create the lockfile.
2. Run `npm run dev` and open the local URL printed by Vite.
3. Run `npm run build` to create the static `dist/` site.
4. Run `npm run preview` to check the production build locally.

The site's dark theme is the default. Use the theme control to switch to the paper-style light theme; only this preference is stored in local storage.

## Customize the portfolio

- Edit identity, SEO text, navigation, social URLs, all section content and labels in `src/data/siteConfig.js`.
- Replace the GitHub placeholder URL there with your GitHub profile.
- Add project descriptions, tools and public HTTPS links in `src/data/projects.js`.
- Add only non-confidential responsibilities to the `responsibilities` arrays in the experience data.
- Replace `src/assets/profile.jpg` with the public portrait you want to use. If it is absent or fails to load, the portrait slot is hidden.
- Replace `public/resume.pdf` with your real resume PDF.
- Change theme tokens and layouts in `src/index.css`.

## Privacy and metadata

The contact phone is displayed because it was requested for this version of the site. Review all public contact and profile details before deployment. Do not add birth, home-location or family-status details, confidential case information, private records or secrets.

Install ExifTool and qpdf. For each replacement photo, strip metadata from the source before copying it into `src/assets/`:

```powershell
exiftool -all= -overwrite_original .\src\assets\profile.jpg
```

After replacing the text placeholder with your real PDF, strip metadata and linearize it:

```powershell
exiftool -all= -overwrite_original .\public\resume.pdf
qpdf --linearize .\public\resume.pdf .\public\resume-clean.pdf
Move-Item -Force .\public\resume-clean.pdf .\public\resume.pdf
```

Inspect cleaned assets and keep private originals outside the published repository. Before release, update the placeholder canonical URL in `index.html`, `src/data/siteConfig.js`, `public/robots.txt` and `public/sitemap.xml`. Replace the contact and canonical URL in `public/.well-known/security.txt`, and refresh its expiry date to one year ahead.

## Deploy

### GitHub Pages

The included workflow in `.github/workflows/deploy.yml` builds and deploys `dist/` when pushed to `main`. In repository settings, enable GitHub Pages with GitHub Actions as the source. Vite derives the project-site base path from the GitHub repository environment. GitHub Pages does not apply custom response headers; only the built HTML's CSP and referrer meta policies apply there.

### Vercel

Import the repository into Vercel and use the Vite defaults: install command `npm install`, build command `npm run build`, output directory `dist`. `vercel.json` applies the security response headers.

The CSP meta tag is omitted only by the local Vite dev server to allow its HMR client; production builds keep the strict policy. The deployed CSP and other headers are also declared in `public/_headers` for static hosts that support that file. Check the actual deployed response headers after every hosting change.

## Pre-release checks

- In browser developer tools, reload with the Network panel open and confirm only same-origin assets are requested; check the Console for errors and CSP violations.
- Run Lighthouse for Performance, Accessibility, Best Practices and SEO.
- Validate the production HTML with the W3C Nu HTML Checker and check CSP with Google CSP Evaluator.
- Scan the repository before the first push with Gitleaks or TruffleHog, and review every finding.
- Test keyboard navigation, reduced-motion settings, the photo fallback, theme persistence, project filters and the mailto contact form.
