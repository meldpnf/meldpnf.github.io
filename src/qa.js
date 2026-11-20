import './style.css'
import './qa.css'

const focus = ['Manual testing', 'Bug reporting', 'Test cases']

// Uniquement des méthodes et outils réellement utilisés (voir docs/learning-log.md)
const methods = [
  { label: 'METHOD', name: 'Requirement-based functional testing' },
  { label: 'METHOD', name: 'Test automation' },
  { label: 'METHOD', name: 'Exploratory testing' },
  { label: 'TOOL', name: 'Squash TM' },
  { label: 'TOOL', name: 'Playwright' },
  { label: 'TOOL', name: 'DevTools' },
  { label: 'TOOL', name: 'Git / GitHub' },
]

const REPO = 'https://github.com/meldpnf/meldpnf.github.io/blob/main'

// Affiche du code tel quel : < > & deviennent du texte, pas du HTML
const escapeHtml = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

// Extrait copié de tests/carousels.spec.ts (lignes 38 à 46)
const codeExcerpt = `const displayedIds = await cards.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-id')));
const expectedIds = instagramPosts.filter((post) => post.caption.includes(category.hashtag)).map((post) => post.id);
const idsToCheck = category.name === 'COLLABS'
 ? displayedIds.filter((id) => !id?.startsWith('collab-'))
 : displayedIds;

idsToCheck.sort();
expectedIds.sort();
expect(idsToCheck).toEqual(expectedIds);`

// Projets QA : pour en ajouter un, ajouter un objet à ce tableau
const projects = [
  {
    id: 'instagram-categorization',
    date: 'November 2026',
    title: 'Instagram Carousel Categorization',
    subtitle: 'Functional Testing & Test Automation — Meily Lab / VISUALS',
    summary:
      'Verification of the automatic categorisation of Instagram posts on the VISUALS page: each post must appear in MAIN, ASTROLOGY or COLLABS according to the hashtag in its caption.',
    stats: [
      { value: '1', label: 'Requirement', note: 'REQ-001' },
      { value: '3/3', label: 'Manual tests passed', note: 'Squash TM', passed: true },
      { value: '3/3', label: 'Automated tests passed', note: 'Playwright', passed: true },
      { value: '2', label: 'Test failure causes identified', note: 'Test data & scope' },
    ],
    tools: ['Squash TM', 'Playwright', 'DevTools', 'Git / GitHub'],
    context: {
      label: 'Experimental project · ENI training',
      text: 'Learning project carried out during my ENI Software Tester training, on a real feature of Meily Lab. Test design, manual execution and failure analysis done independently; Playwright code written by hand with technical guidance.',
    },
    details: () => instagramDetails,
  },
]

// Sections de l'étude de cas : même logique numéro + titre que la page
const caseSection = (number, title, content) => `
  <section class="case-section">
    <div class="case-section__index">
      <span class="qa-section__number">${number}</span>
      <h3>${title}</h3>
    </div>
    <div class="case-section__body">${content}</div>
  </section>
`

const openIcon = `<svg class="icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7 9" /></svg>`

const instagramDetails = `
  ${caseSection(
    '01',
    'Context & Requirement',
    `<p>The VISUALS page of Meily Lab displays Instagram posts in three galleries. A post is placed in a gallery according to a hashtag in its caption.</p>
    <ul class="mapping">
      <li><code>#meily_main</code><span>MAIN</span></li>
      <li><code>#meily_astrology</code><span>ASTROLOGY</span></li>
      <li><code>#meily_collab</code><span>COLLABS</span></li>
    </ul>
    <p><span class="ref">REQ-001</span> Automatic categorisation of Instagram carousels. The scope is limited to this hashtag-based categorisation.</p>
    <a class="text-link" href="https://meldpnf.github.io/visuals/" target="_blank" rel="noopener">View the tested feature — VISUALS ${openIcon}</a>`,
  )}

  ${caseSection(
    '02',
    'Manual Testing',
    `<p>In a local Squash TM Community instance (Docker), I wrote the requirement, designed one test case per category with preconditions, steps and expected results, linked each case to REQ-001, then executed them in a campaign iteration (IT-001).</p>
    <table class="register">
      <thead><tr><th>Test case</th><th>Category</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td class="register__id">TC-001</td><td>MAIN</td><td><span class="status status--passed">Passed</span></td></tr>
        <tr><td class="register__id">TC-002</td><td>ASTROLOGY</td><td><span class="status status--passed">Passed</span></td></tr>
        <tr><td class="register__id">TC-003</td><td>COLLABS</td><td><span class="status status--passed">Passed</span></td></tr>
      </tbody>
    </table>
    <figure class="evidence evidence--context">
      <img src="/qa/squash-tm-execution-plan.png" alt="Squash TM interface: Executions view of iteration IT-001 in the Meily Lab project" loading="lazy" width="1850" height="385" />
      <figcaption>Context — Squash TM, Executions view of iteration IT-001.</figcaption>
    </figure>
    <figure class="evidence evidence--detail">
      <img src="/qa/squash-tm-execution-table.png" alt="Squash TM execution plan, detail: test cases TC-001, TC-002 and TC-003, each with a success status and 100% executed" loading="lazy" width="1022" height="140" />
      <figcaption>Detail — execution plan: TC-001, TC-002 and TC-003, each executed at 100% with a success status.</figcaption>
    </figure>`,
  )}

  ${caseSection(
    '03',
    'Test Automation',
    `<p>The three categories were then automated with Playwright, in TypeScript. For each category, the test:</p>
    <ol class="steps">
      <li>opens the published VISUALS page;</li>
      <li>finds the category heading and the gallery below it;</li>
      <li>collects the <code>data-id</code> of every displayed card;</li>
      <li>selects, in the Instagram data file, the posts whose caption contains the category hashtag;</li>
      <li>compares the expected IDs with the displayed IDs.</li>
    </ol>
    <p>MAIN is written as a single test; ASTROLOGY and COLLABS share one test generated by a loop over a list of categories.</p>
    <figure class="code">
      <figcaption><span>tests/carousels.spec.ts</span><span>lines 38–46</span></figcaption>
      <pre tabindex="0"><code>${escapeHtml(codeExcerpt)}</code></pre>
    </figure>
    <figure class="evidence">
      <img src="/qa/playwright-test-run.png" alt="VS Code with the Playwright Test Explorer showing 3 of 3 tests passed in carousels.spec.ts, next to the test code" loading="lazy" width="1300" height="975" />
      <figcaption>VS Code — Playwright Test Explorer: 3/3 tests passed.</figcaption>
    </figure>
    <a class="text-link" href="${REPO}/tests/carousels.spec.ts" target="_blank" rel="noopener">View the source on GitHub ${openIcon}</a>`,
  )}

  ${caseSection(
    '04',
    'Investigation & Troubleshooting',
    `<p>On the first runs, MAIN passed but ASTROLOGY and COLLABS failed. I compared the expected and displayed IDs in the Playwright results, inspected the cards with DevTools and searched the missing IDs in the Instagram data file. Two causes were identified.</p>
    <div class="findings">
      <article class="finding">
        <span class="label">Finding A · Test scope</span>
        <h4>Manually added collaborations</h4>
        <p>Some COLLABS cards have IDs such as <code>collab-01</code>. These collaborations were published from a collaborator's account and added to the site manually: they do not depend on hashtags.</p>
        <p class="finding__action">→ The COLLABS comparison now excludes only IDs starting with <code>collab-</code>. Instagram posts are still compared.</p>
      </article>
      <article class="finding">
        <span class="label">Finding B · Test data</span>
        <h4>Outdated local reference data</h4>
        <p>Recent posts were shown on the published site, which is synchronised with Instagram every day, but were missing from the local JSON file used by the tests.</p>
        <p class="finding__action">→ The local data was refreshed with the project's Instagram sync script.</p>
      </article>
    </div>
    <p class="note">Neither finding is a defect of the site: both were differences between the reference data and the rules covered by the tests.</p>`,
  )}

  ${caseSection(
    '05',
    'Results & Evidence',
    `<dl class="stats stats--compact">
      <div><dt>Manual tests passed</dt><dd class="is-passed">3/3</dd></div>
      <div><dt>Automated tests passed</dt><dd class="is-passed">3/3</dd></div>
      <div><dt>Investigated</dt><dd class="stats__text">Data sync &amp; test scope</dd></div>
    </dl>
    <ul class="list list--small">
      <li class="list__row"><span class="label">Evidence</span><span>Squash TM execution plan — section 02</span></li>
      <li class="list__row"><span class="label">Evidence</span><span>Playwright test run — section 03</span></li>
      <li class="list__row"><span class="label">Source</span><a class="text-link" href="${REPO}/tests/carousels.spec.ts" target="_blank" rel="noopener">tests/carousels.spec.ts ${openIcon}</a></li>
      <li class="list__row"><span class="label">Feature</span><a class="text-link" href="https://meldpnf.github.io/visuals/" target="_blank" rel="noopener">meldpnf.github.io/visuals ${openIcon}</a></li>
    </ul>`,
  )}
`

// Bloc projet : tout le bloc est cliquable grâce au bouton qui le recouvre
const projectCard = (project) => `
  <article class="project">
    <div class="project__head">
      <span class="label">Featured project · ${project.date}</span>
      <h3 class="project__title">${project.title}</h3>
      <p class="project__subtitle">${project.subtitle}</p>
    </div>
    <p class="project__summary">${project.summary}</p>
    <dl class="stats">
      ${project.stats
        .map(
          (s) => `
        <div>
          <dt>${s.label}<span>${s.note}</span></dt>
          <dd${s.passed ? ' class="is-passed"' : ''}>${s.value}</dd>
        </div>`,
        )
        .join('')}
    </dl>
    <div class="project__foot">
      <span class="project__tools">${project.tools.join(' · ')}</span>
      <button class="project__open" type="button" data-project="${project.id}" aria-haspopup="dialog">
        View project details ${openIcon}
      </button>
    </div>
  </article>
`

// Chaque section : numéro + titre dans la colonne de gauche, contenu à droite
const section = (number, title, content) => `
  <section class="qa-section">
    <div class="qa-section__index">
      <span class="qa-section__number">${number}</span>
      <h2>${title}</h2>
    </div>
    <div class="qa-section__body">${content}</div>
  </section>
`

document.querySelector('#app').innerHTML = `
  <main class="qa">
    <a class="back" href="/">← MÉLINA</a>

    <header class="qa__header">
      <span class="label">Section · Tech</span>
      <h1>QA</h1>
      <p>Software testing &amp; investigation.</p>
      <p class="qa__intro">A space for hands-on QA projects, tests and experiments, documenting both the process and the results.</p>
      <p>Currently training as a Software Tester at ENI</p>
    </header>

    ${section('01', 'QA LAB', projects.map(projectCard).join(''))}

    ${section(
      '02',
      'METHODS / TOOLS',
      `<ul class="list">
        ${methods
          .map(
            (m) => `
          <li class="list__row">
            <span class="label">${m.label}</span>
            <span>${m.name}</span>
          </li>`,
          )
          .join('')}
      </ul>`,
    )}

    ${section(
      '03',
      'CURRENT FOCUS',
      `<ul class="list">
        ${focus.map((item) => `<li>${item}</li>`).join('')}
      </ul>`,
    )}
  </main>

  <dialog class="case" aria-labelledby="case-title">
    <div class="case__inner">
      <button class="case__close" type="button" aria-label="Close project details" autofocus>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" /></svg>
      </button>
      <header class="case__header">
        <span class="label">Case study · <span data-field="date"></span></span>
        <h2 id="case-title" data-field="title"></h2>
        <p data-field="subtitle"></p>
        <aside class="case__context">
          <span class="label" data-field="context-label"></span>
          <p data-field="context-text"></p>
        </aside>
      </header>
      <div class="case__content"></div>
    </div>
  </dialog>
`

// Fenêtre de l'étude de cas : <dialog> gère la touche Échap, le fond et garde le focus dedans
const dialog = document.querySelector('.case')
let opener = null

document.querySelectorAll('.project__open').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects.find((p) => p.id === button.dataset.project)
    dialog.querySelector('[data-field="date"]').textContent = project.date
    dialog.querySelector('[data-field="title"]').textContent = project.title
    dialog.querySelector('[data-field="subtitle"]').textContent = project.subtitle
    dialog.querySelector('[data-field="context-label"]').textContent = project.context.label
    dialog.querySelector('[data-field="context-text"]').textContent = project.context.text
    dialog.querySelector('.case__content').innerHTML = project.details()
    opener = button
    dialog.showModal()
    dialog.scrollTop = 0
  })
})

dialog.querySelector('.case__close').addEventListener('click', () => dialog.close())

// Clic sur le fond sombre (en dehors du contenu) : ferme la fenêtre
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close()
})

// À la fermeture, le focus revient sur le bouton du projet
dialog.addEventListener('close', () => opener?.focus())
