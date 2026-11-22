LUMIMASK WEBSITE EXPORT — November 22, 2026

website/ contains ready-to-serve HTML pages, compiled CSS and JavaScript,
product images, icon files, local fonts and the uploaded music file.
source/ contains the editable React/TypeScript project and its configuration,
plus local copies of the CDN media under public/__l5e/.

VIEW THE WEBSITE
1. Extract this ZIP.
2. Open a terminal inside the website folder.
3. Run: python3 -m http.server 8000
4. Open http://localhost:8000 in your browser.
Do not double-click index.html: JavaScript modules need an HTTP server.

HOSTING
Upload the contents of website/ to the root of a static web host.
The /about/, /privacy/, /refunds/, /shipping/ and /terms/ folders each contain
index.html. Keep the assets and __l5e folders in place. Serving beneath a
subfolder requires adjusting root-relative paths.

EDITING
The compiled JS/CSS are optimized distribution files. For substantial changes,
use source/: install Bun, run bun install, then bun run dev. The original
Lovable Vite configuration is retained and requires its package dependencies.
No node_modules, build directories, credentials, or Git data are included.
The ready-to-serve website is a snapshot of the published site; the editable
source is the current project.

CHECKOUT AND MUSIC
Buy buttons still open the owner's Shopify checkout in a separate tab.
Checkout requires internet; no payment form is included in this website.
Music attempts autoplay and falls back to the first tap if the browser blocks
automatic sound. Playback continues across internal navigation.
Only publish or redistribute the music if you have the necessary rights.
The original Nov 14–21 deal remains expired; its dates were not extended.

Lovable visit-tracking injection was excluded from the exported HTML.
Exporting does not change or publish the live store.
