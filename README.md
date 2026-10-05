# kf-production.com

KF Production's site at https://kf-production.com, served by GitHub Pages from the root of `main`
(repo `jasonmkf.github.io`). The custom domain is set by `web/public/CNAME`, which each deploy
copies to the root.

The source is the Next.js app in `web/`. Apps and their pages are in `web/src/data/apps.tsx`,
the privacy policies in `web/src/components/PrivacyPolicy.tsx`. The holiday pages
(`/<app>/<year>/`, `/<app>/public-holidays-<year>/`, `/<app>/school-holidays-<year>/`) are built
from the Lunar Calendar app's data: `node scripts/sync-holidays.mjs` copies it into
`web/src/data/holidays/`, and `HOLIDAY_YEARS` in `web/src/data/holidays.ts` (and `YEARS` in the
script) says which years get pages. The app pages' screenshots come from the store listings:
`node scripts/fetch-screenshots.mjs [app-id ...]` (needs ImageMagick) refreshes
`web/public/screenshots/` and `web/src/data/screenshots.json`. To change the site:

    cd web
    npm install
    npm run deploy        # builds, then replaces the repo root with the new export
    cd .. && git add -A && git commit && git push

Keep `/<app>/`, `/<app>/privacy.html`, `/app-ads.txt` and the Search Console tag in
`web/src/app/layout.tsx`: the store listings, AdMob and the Google Auth Platform point at them.
