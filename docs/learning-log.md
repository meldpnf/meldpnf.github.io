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
Not documented (changes not committed yet)

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
Not documented (changes not committed yet)
