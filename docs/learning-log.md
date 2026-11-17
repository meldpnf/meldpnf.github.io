# Learning log

Journal synthétique de mes expériences pratiques (DEV, QA, DEBUG, GIT, TOOLING) sur ce projet.

Une entrée par tâche significative. Le format et les règles sont définis dans `CLAUDE.md` (sections PROJECT LEARNING LOG et ACCURACY RULE).

Exercices QA détaillés : [`qa/exercises/`](qa/exercises/)

---

## 2026-10-10 — [DEV] — Homepage typography and background textures

**Task**
Refine the split-screen homepage (Creative / Tech) without changing its structure: Creative font, split "MÉL / INA" title, CSS-only background textures, alignment adjustments.

**My role**
- Came up with the split-screen concept (Creative / Tech halves)
- Defined the visual direction and constraints (50/50 split, palette, equal stroke weight for MÉL / INA, no images)
- Selected the fonts to compare (11 tested) and chose Unbounded
- Reviewed each iteration in the browser and requested adjustments (title size, letter spacing, weights, texture intensity)
- Spotted an optical misalignment between rounded and rectangular buttons and documented it with a screenshot

**AI-assisted work**
- Claude Code implemented the initial split-screen layout from my concept (commit of 2026-10-09)
- Claude Code wrote all HTML/CSS/JS changes, measured font metrics and checked alignment with headless screenshots
- ChatGPT used for reflection and design direction

**Tools / concepts**
Vite, CSS custom properties, Google Fonts, CSS gradients, SVG noise filter (feTurbulence), CSS grid, optical alignment

**Result**
Validated homepage with Unbounded / Inter split title and subtle textures on both halves.

**What I learned**
- How a design direction is translated into CSS through successive iterations
- Visual alignment can differ from measured alignment (optical illusion with rounded vs rectangular shapes)

**Related QA exercise**
Not applicable

**Related Git commit**
aa29124 — Refine homepage and add DEV page and learning docs

## 2026-10-10 — [TOOLING] — Work environment and AI-assisted workflow setup

**Task**
Set up the working environment and workflow for the Meily Lab project (sessions of 2026-10-09 and 2026-10-10).

**My role**
- Prepared the work environment for the project
- Determined my workflow and how to put it in place
- Drove Claude Code from the Ubuntu terminal and from VS Code
- Defined the rules for my learning system (learning log, QA exercises, accuracy rule) and decided to separate personal and project instructions

**AI-assisted work**
- ChatGPT used for reflection on the workflow and project direction
- Claude Code reset the default Vite starter, created the `docs/` structure and reorganised the CLAUDE.md files

**Tools / concepts**
Ubuntu terminal, VS Code, Claude Code, ChatGPT, Vite, CLAUDE.md (instructions for Claude)

**Result**
Working Vite project, personal and project-level CLAUDE.md files, learning log and QA exercise folder in place.

**What I learned**
- The role of each file in a Vite project
- How to drive Claude Code from the terminal and from VS Code
- How to prepare a work environment and structure a workflow for a project

**Related QA exercise**
Not applicable

**Related Git commit**
aa29124 — Refine homepage and add DEV page and learning docs

## 2026-10-14 — [DEV] — QA, VISUALS and MUSIC pages (first versions)

**Task**
Create first versions of three new pages: QA (Tech side), VISUALS and MUSIC (Creative side), with placeholders and local data prepared for future Instagram / Spotify APIs.

**My role**
- Defined the structure, content and visual direction of each page (QA as an investigation space, masonry gallery for VISUALS, one track = one line for MUSIC)
- Defined the future data logic: hashtags for classification (#meily_main, #meily_astrology, #meily_collab, #meily_track_…), one global Art Experiment numbering, one clip per track
- Reviewed the results and requested changes (vertical 9:16 clips, platform logos in original colours)
- Edited code myself: changed the QA accent colour, added a sentence to the QA header, moved a post to ASTROLOGY by changing its hashtag, changed the font size of the MAIN / ASTROLOGY headings
- Provided the artist platform links

**AI-assisted work**
- Claude Code wrote the HTML / CSS / JS for the three pages, the local data structures and the hashtag classification function
- Claude Code installed Simple Icons for the platform logos and checked the pages with headless screenshots and a production build

**Tools / concepts**
Vite multi-page setup, JavaScript template literals (HTML generated from JS), arrays of objects as local data, `filter` / `map`, CSS grid, CSS `columns` (masonry), `aspect-ratio`, `rem` unit, SVG logos (Simple Icons), npm dependency

**Result**
Three new pages linked from the homepage, ready to be fed by real data later without rebuilding the layout.

**What I learned**
- Why the page HTML can be generated from JavaScript: data written once per item, layout written once
- The roles of HTML (structure), CSS (appearance) and JavaScript (behaviour)
- Where to find and change a style: selector (e.g. `.series h3`) and property (e.g. `font-size`)

**Related QA exercise**
Not applicable

**Related Git commit**
f107769 — Build visuals and music pages

## 2026-10-30 — [DEV] — MUSIC page connected to Spotify and YouTube Shorts

**Task**
Replace the hand-written track list of the MUSIC page with real data: Spotify discography (covers, dates, links) and YouTube Shorts attached to each track, viewable in a large video player.

**My role**
- Created the Spotify and YouTube API credentials and stored them myself in the local `.env` file
- Required that the Spotify Client Secret never reaches the frontend
- Added the `#meily_track_…` hashtags to the descriptions of my YouTube Shorts
- Chose the automatic matching approach (hashtags) over manual video links
- Asked for a way to watch the Shorts in full screen and approved the video player solution
- Tested the result on desktop

**AI-assisted work**
- Claude Code proposed the architecture (build-time Node script, no server) and wrote the script that fetches Spotify and YouTube data into `src/data/discography.json`
- Claude Code updated the MUSIC page to read this file, display covers and Spotify links, and open Shorts in a `<dialog>` video player
- Claude Code set up `.env` / `.env.example` / `.gitignore` and checked the build, the absence of credentials in `dist/`, and the player behaviour with Playwright

**Tools / concepts**
Spotify Web API (Client Credentials), YouTube Data API v3, API keys and secrets, `.env` file, `.gitignore`, Node script run with `npm run music`, JSON data file, `fetch`, regular expression to read a hashtag, `<dialog>` element, YouTube embed

**Result**
The MUSIC page shows 17 real releases from Spotify, 11 of them with a YouTube Short that opens in a large player with full-screen option. New releases are added by running `npm run music`.

**What I learned**
- Spotify Canvas videos are not available through the public Spotify API
- Secret keys stay in `.env`, which is excluded from Git and only read by a script on my computer
- Not documented (to complete)

**Related QA exercise**
Not applicable

**Related Git commit**
c345743 — Connect MUSIC page to Spotify and YouTube Shorts

## 2026-11-05 — [DEV] — VISUALS gallery connected to Instagram

**Task**
Replace the placeholders of the VISUALS page with real Instagram posts, then find a gallery layout that suits the page.

**My role**
- Generated the Instagram token and stored it in the local `.env` file
- Added the `#meily_main`, `#meily_astrology` and `#meily_collab` hashtags to my posts
- Compared the result with my account and noticed that 44 posts were received out of 56, and that carousels only showed their first image
- Reviewed several AI-assisted layouts over two days, rejected them and decided to return to the first simple gallery
- Changed the number of columns myself to test 4, then kept 3
- Adjusted the `border-radius` of the images myself (4px)
- Approved the final render

**AI-assisted work**
- Claude Code wrote the script that fetches the posts, downloads their images into `public/instagram/` and creates `src/data/instagram.json`
- Claude Code connected the VISUALS page to this file and wrote the layouts that were tested
- Claude Code found the first gallery in past session history, restored it and checked it at three screen sizes with Playwright
- Claude Code checked that the token was not in the commit

**Tools / concepts**
Instagram API, access token, `.env` file, Node script run with `npm run instagram`, JSON data file, CSS `columns` (masonry layout), `border-radius`, Playwright, selective `git add`

**Result**
The VISUALS page shows 27 real posts: 11 MAIN, 8 ASTROLOGY and 8 COLLABS, in 3 columns. Each post shows its first image. The 27 cover images (13 MB) are committed; the 129 other carousel images (68 MB) stay local and are not displayed.

**What I learned**
- Clarified my understanding of what an API is and how it is integrated into a project
- Connected my QA tester training (integration testing, covered in my course) with practice, through this real integration
- This led me to plan an integration testing experiment on the Meily Lab project

**Related QA exercise**
Not applicable

**Related Git commit**
b261202 — Connect VISUALS gallery to Instagram posts
