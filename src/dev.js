import './style.css'
import './dev.css'

const toolGroups = [
  { label: 'BUILD', tools: 'HTML · CSS · JavaScript · Vite' },
  { label: 'WORKFLOW', tools: 'Git · Linux · VS Code' },
  { label: 'AI', tools: 'Claude Code' },
]

// Adresse du dépôt GitHub de Meily Lab : à remplir quand le dépôt existera.
// Tant qu'elle est vide, le lien s'affiche grisé et n'est pas cliquable.
const repoUrl = ''

const repoLink = repoUrl
  ? `<a class="project__link" href="${repoUrl}" target="_blank" rel="noopener noreferrer">View repository ↗</a>`
  : `<span class="project__link project__link--disabled">View repository ↗</span>`

// Apprentissages DEV : résumés courts du journal docs/learning-log.md
const progress = [
  {
    date: '2026-10-10',
    category: 'DEV',
    title: 'Homepage typography and textures',
    text: 'Defined the visual direction, compared 11 fonts and reviewed AI-assisted CSS iterations. Learned that optical alignment can differ from measured alignment.',
  },
  {
    date: '2026-10-10',
    category: 'TOOLING',
    title: 'Work environment and workflow',
    text: 'Prepared my work environment and an AI-assisted workflow, driving Claude Code from the terminal and VS Code.',
  },
]

const steps = [
  { name: 'Concept', desc: 'Define the idea and purpose' },
  { name: 'Design direction', desc: 'Structure, visual identity and UX' },
  { name: 'AI-assisted implementation', desc: 'Build with Claude Code' },
  { name: 'Testing', desc: 'Check behaviour and usability' },
  { name: 'Iteration', desc: 'Refine from results' },
  { name: 'Version control', desc: 'Track changes with Git' },
]

document.querySelector('#app').innerHTML = `
  <main class="dev">
    <a class="back" href="/">← MÉLINA</a>

    <header class="dev__header">
      <h1>DEV</h1>
      <p>AI-assisted web development.</p>
      <p class="dev__intro">
        I design and build web experiences using an AI-assisted workflow.
        I focus on concept, structure, visual direction, testing and iteration
        while progressively learning the code behind the implementation.
      </p>
    </header>

    <section class="block">
      <h2>TOOLS</h2>
      <ul class="tools">
        ${toolGroups
          .map(
            (group) => `
          <li class="tool-group">
            <span class="label">${group.label}</span>
            <span>${group.tools}</span>
          </li>`,
          )
          .join('')}
      </ul>
    </section>

    <section class="block">
      <h2>PROJECTS</h2>
      <ul class="projects">
        <li class="project">
          <div class="project__head">
            <span class="project__name">Meily Lab</span>
            <span class="project__status">In progress</span>
          </div>
          <p class="project__desc">Personal experimental website</p>
          <dl class="project__details">
            <dt class="label">Role</dt>
            <dd>Concept, structure, visual direction, AI-assisted implementation, testing</dd>
            <dt class="label">Stack</dt>
            <dd>HTML · CSS · JavaScript · Vite · Git</dd>
          </dl>
          ${repoLink}
        </li>
        <li class="project project--placeholder">
          <span class="project__name">Future project</span>
        </li>
      </ul>
    </section>

    <section class="block">
      <h2>PROCESS</h2>
      <ol class="process">
        ${steps
          .map(
            (step, i) => `
          <li class="step">
            <span class="step__number">${String(i + 1).padStart(2, '0')}</span>
            <span class="step__name">${step.name}</span>
            <span class="step__desc">${step.desc}</span>
          </li>`,
          )
          .join('')}
      </ol>
    </section>

    <section class="block">
      <h2>PROGRESS</h2>
      <ul class="progress">
        ${progress
          .map(
            (entry) => `
          <li class="entry">
            <div class="entry__meta">
              <span class="entry__date">${entry.date}</span>
              <span class="label">${entry.category}</span>
            </div>
            <div>
              <h3 class="entry__title">${entry.title}</h3>
              <p class="entry__text">${entry.text}</p>
            </div>
          </li>`,
          )
          .join('')}
      </ul>
    </section>
  </main>
`
