# jasonmkf.github.io

KF Production's site, served by GitHub Pages from the root of `main`.

The source is the Next.js app in `web/`. Apps and their pages are in `web/src/data/apps.tsx`,
the privacy policies in `web/src/components/PrivacyPolicy.tsx`. To change the site:

    cd web
    npm install
    npm run deploy        # builds, then replaces the repo root with the new export
    cd .. && git add -A && git commit && git push

Keep `/<app>/`, `/<app>/privacy.html`, `/app-ads.txt` and the Search Console tag in
`web/src/app/layout.tsx`: the store listings, AdMob and the Google Auth Platform point at them.
