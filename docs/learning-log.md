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

## 2026-11-18 — [QA] — Mini QA project: requirement, test cases and manual execution in Squash TM

**Task**
First concrete project for my junior software tester portfolio, alongside my ENI training (sessions of 2026-11-17 and 2026-11-18). Feature under test: automatic categorisation of Instagram carousels in the VISUALS gallery, based on the hashtags in the post captions. The scope is deliberately limited to this feature, to carry out a complete QA approach, from requirements to automation.

**My role**
Environment setup (guided):
- Installed my own Squash TM Community environment on Ubuntu, with Docker and PostgreSQL, following ChatGPT's guidance for the commands and technical configuration

Test design and execution (done personally, reviewed with ChatGPT):
- Created the Meily Lab QA project in Squash TM
- Wrote the functional requirement `REQ-001` (automatic categorisation of carousels)
- Designed three test cases, one per category: TC-001 MAIN, TC-002 ASTROLOGY, TC-003 COLLABS (description, preconditions, actions, expected results)
- Linked the test cases to the requirement
- Created a test campaign and an iteration
- Executed the three test cases manually

For the design work, I proposed my own answers and choices; we then reviewed them together and corrected them when needed.

**AI-assisted work**
- ChatGPT provided the commands and configuration steps for the Docker / PostgreSQL / Squash TM installation
- ChatGPT acted as a reviewer for the requirement and test cases; it did not do the work in Squash TM for me

**Tools / concepts**
Squash TM Community, Docker, PostgreSQL, Ubuntu, requirement, test case, requirement–test case traceability, test campaign, iteration, manual test execution

**Result**
Status: done and validated.
- Three test cases executed manually (iteration IT-001), three passed
- The tests cover the gallery categories and their matching hashtags; full details are kept in Squash TM
- These tests are manual only: they are not automated at this stage
- Update: the MAIN, ASTROLOGY and COLLABS cases were automated with Playwright on 2026-11-20, see the corresponding entry

**What I learned**
2026-11-17:
- How to set up a local Squash TM environment using Docker and PostgreSQL
- The difference between a Docker image and a container, and how to check container status and logs
- Started understanding how to structure a QA project and write testable functional requirements
- A running Docker container does not necessarily mean the application is ready to use

2026-11-18:
- How to organise requirements, test cases, campaigns, iterations and manual executions in Squash TM
- The difference between test data and parameterised datasets
- Practised writing test objectives, prerequisites, actions and expected results

**Related QA exercise**
Not applicable (Squash TM project, not a QA-XXX exercise)

**Related Git commit**
Not applicable (work done in Squash TM)

## 2026-11-18 — [TOOLING] — Start of Playwright automation in TypeScript (TC-001 in progress)

**Task**
Start automating the test cases of the mini QA project with Playwright, in VS Code (sessions of 2026-11-17 and 2026-11-18).

**My role**
Done personally in VS Code:
- Checked Node.js, npm and Playwright Test
- Checked the structure of the `meily-lab` project
- Discovered and used the VS Code Testing panel
- Created `playwright.config.ts` by hand (tests folder `./tests`, Chromium browser)
- Created `tests/carousels.spec.ts` by hand
- Started writing the first automated test, TC-001 (MAIN category)
- Wrote every line of TypeScript myself

Learning method used:
1. I type each instruction myself
2. Each word and symbol is explained to me (parentheses, braces, commas, dots, operators, quotes, etc.)
3. I say out loud, in French, what I am writing, to understand exactly what I am asking the program to do
4. We check my understanding before moving on

This method links my first algorithmics lessons to JavaScript / TypeScript instructions. The goal is real understanding of the code, not copying scripts I could not explain.

**AI-assisted work**
ChatGPT acted as a step-by-step trainer and explained the code; it did not write the code for me.

**Tools / concepts**
VS Code, VS Code Testing panel, Node.js, npm, Playwright Test, TypeScript. Concepts started: `import`, `test`, `expect`, `async`, `await`, `page`, `goto`, `const`, Playwright selectors.

**Result**
Status: started, not finished.
- `playwright.config.ts` and `tests/carousels.spec.ts` exist (not committed yet)
- TC-001 is being written: it currently opens the VISUALS page and clicks on MAIN; it has no assertion yet
- TC-001 has not been run or validated yet
- The older JavaScript test `tests/home.spec.js` is kept

Decisions taken:
- Learn automation in TypeScript
- Group the automated tests in `tests/carousels.spec.ts`, with separate test blocks
- Really check the relation between hashtag and displayed category, not just replay clicks; the technical method for comparing with the Instagram data is still to be defined
- Try three complementary methods:
  - TC-001 — MAIN: written by hand, instruction by instruction, to understand the syntax, actions and assertions
  - TC-002 — ASTROLOGY: Playwright Codegen, then review, understand, complete and correct the generated code if needed
  - TC-003 — COLLABS: consolidation, reusing what I learned with the first two methods to gain autonomy

Next steps (planned):
- Finish writing TC-001 by hand
- Run it and check its assertions
- Discover Playwright Codegen with ASTROLOGY
- Consolidate with COLLABS
- Run and analyse the automated tests
- Prepare the material for the QA portfolio: requirements, test cases, manual results, scripts and automated results

**What I learned**
2026-11-18:
- Discovered the Testing panel in VS Code and configured Playwright to recognise my tests
- Started learning TypeScript syntax, including imports, functions, objects, `async`, `await` and Playwright locators
- How to identify HTML elements to prepare automated tests

**Related QA exercise**
Not applicable

**Related Git commit**
Not available on 2026-11-18. Update: the tests were finished and committed on 2026-11-20, see the next entry.

## 2026-11-20 — [QA] — Mini QA project: Playwright automation, investigation of failures and validation

**Task**
Continuation of the mini QA project on `REQ-001` (automatic categorisation of Instagram carousels in the VISUALS gallery). Automate the checks of the MAIN, ASTROLOGY and COLLABS categories with Playwright, investigate the first failures, then validate and version the work.

**My role**
Playwright code (written by hand, guided):
- Wrote the code manually in VS Code, line by line, with ChatGPT guiding the configuration and explaining each instruction
- Finished TC-001 (MAIN) in `tests/carousels.spec.ts`: the test opens the published VISUALS page, finds the MAIN heading and its gallery, reads the `data-id` of the displayed cards, selects in `src/data/instagram.json` the posts whose caption contains `#meily_main`, and compares the two sorted lists of IDs
- Covered ASTROLOGY and COLLABS with a `categories` array (name + hashtag) and a `for` loop, worked out with ChatGPT, instead of repeating the same code
- Progression: at first I needed detailed explanations of syntax and functions; I then started to recognise repeated structures, anticipate some instructions and see how to reuse existing logic. I am still a beginner in JavaScript / TypeScript and Playwright and cannot yet write these automations fully on my own.

Execution and investigation (done personally):
- Ran the tests myself: MAIN passed, ASTROLOGY and COLLABS failed
- Investigated the failures by comparing expected and displayed IDs, using the Playwright results, the JSON files and the browser DevTools
- Recognised that some collaborations had been added manually, without hashtag, and confirmed this hypothesis in DevTools: these COLLABS cards have IDs like `collab-01`, `collab-02`, `collab-03` (collaborations published from a collaborator's account, stored in `src/data/collabs.json`)
- Searched the other failing IDs in `instagram.json`, found they were missing, and linked this to the daily automatic Instagram sync: recent posts shown online were not yet in my local data
- Both causes were identified from my own observations and my knowledge of how the site works

Fix, validation and versioning (done in my terminal, guided):
- Adapted the COLLABS comparison to exclude only the IDs starting with `collab-`; Instagram posts are still compared
- Ran `npm run instagram` to update the local data
- Ran the tests again: the three tests passed
- Committed the images, data and tests with Git, pushed to GitHub, and configured GitHub CLI authentication on Ubuntu

**AI-assisted work**
- ChatGPT guided the Playwright configuration and explained the code I wrote
- After I identified the causes, ChatGPT guided the technical steps to fix them: updating the local data and adapting the COLLABS comparison to the scope of `REQ-001`
- ChatGPT guided the Git commands (staging the images, commits, push), finding and running the Instagram script, and the GitHub CLI authentication
- The `sync-and-deploy.yml` workflow (daily sync and deployment) was developed earlier with Claude Code (2026-11-17, commit b4e8c68), as was `scripts/fetch-instagram.js` (see 2026-11-05 entry); they are not my own implementation

**Autonomy summary**
- Most autonomous: design and execution of the manual tests, identification of the causes of failure
- Still guided: Playwright programming, Git commands, some configuration steps

**Tools / concepts**
Playwright Test, TypeScript, VS Code, browser DevTools, JSON import in a test (`with { type: 'json' }`), locators (`getByRole`, `locator`), `evaluateAll`, `filter` / `map`, `sort`, `toEqual` assertion, array of objects + `for…of` loop, template literal for test names, ternary operator, test data vs displayed data, GitHub Actions (scheduled run), Git, GitHub CLI

**Result**
Status: done and validated.
- Three automated tests in `tests/carousels.spec.ts`: `TC-001 - Classement MAIN`, `Classement ASTROLOGY`, `Classement COLLABS`. All three pass.
- Two causes of failure identified, both about test data and test scope, not a demonstrated categorisation defect on the site:
  1. Manual COLLABS cards (`collab-…` IDs) are outside the hashtag mechanism covered by `REQ-001`
  2. The local `instagram.json` was older than the published site, which is updated by the workflow every day at 5:00 UTC (6:00 in Paris in winter). Running `npm run instagram` updated it: 51 posts received, 34 categorised by hashtag, 201 images referenced

**What I learned**
- A failing automated test does not necessarily mean the application is wrong: the reference data or the test scope can be the cause
- Automated tests that compare with a data file depend on that file being up to date with the tested environment
- How to use DevTools to check element attributes (`data-id`) during an investigation
- An array and a loop avoid repeating the same test code for each category

**Related QA exercise**
Not applicable (Squash TM project, not a QA-XXX exercise)

**Related Git commit**
- b7862cf — Add Instagram gallery images (129 image files)
- a35e82a — Add Playwright carousel tests and sync Instagram data (new images, updated `instagram.json`, `tests/carousels.spec.ts`, `playwright.config.ts`)
