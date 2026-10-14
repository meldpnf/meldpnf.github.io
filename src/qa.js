import './style.css'
import './qa.css'

const focus = ['Manual testing', 'Bug reporting', 'Test cases']

// Uniquement des méthodes et outils réellement utilisés
const methods = [
  { label: 'METHOD', name: 'Exploratory testing' },
  { label: 'TOOL', name: 'DevTools' },
]

// Exercices QA : à remplacer par les vrais exercices de docs/qa/exercises/
const exercises = [
  { id: 'QA-001', title: 'Placeholder — exercise not started', status: 'Placeholder' },
  { id: 'QA-002', title: 'Placeholder — exercise not started', status: 'Placeholder' },
]

// Rapports de bugs : vides tant qu'aucun vrai rapport n'est écrit
const bugReports = [
  { id: '—', title: 'Placeholder — future bug report', severity: '—', status: 'Placeholder' },
  { id: '—', title: 'Placeholder — future bug report', severity: '—', status: 'Placeholder' },
]

// Expériences QA issues de docs/learning-log.md (aucune pour l'instant)
const progress = []

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

const statusTag = (status) =>
  `<span class="status${status === 'Placeholder' ? ' status--placeholder' : ''}">${status}</span>`

document.querySelector('#app').innerHTML = `
  <main class="qa">
    <a class="back" href="/">← MÉLINA</a>

    <header class="qa__header">
      <span class="label">Section · Tech</span>
      <h1>QA</h1>
      <p>Software testing &amp; investigation.</p>
      <p>Currently training as a Software Tester at ENI</p>
    </header>

    ${section(
      '01',
      'CURRENT FOCUS',
      `<ul class="list">
        ${focus.map((item) => `<li>${item}</li>`).join('')}
      </ul>`,
    )}

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
      'QA LAB',
      `<table class="register">
        <thead>
          <tr><th>ID</th><th>Exercise</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${exercises
            .map(
              (ex) => `
            <tr class="is-placeholder">
              <td class="register__id">${ex.id}</td>
              <td>${ex.title}</td>
              <td>${statusTag(ex.status)}</td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>`,
    )}

    ${section(
      '04',
      'BUG REPORTS',
      `<table class="register">
        <thead>
          <tr><th>ID</th><th>Report</th><th>Severity</th><th>Status</th></tr>
        </thead>
        <tbody>
          ${bugReports
            .map(
              (bug) => `
            <tr class="is-placeholder">
              <td class="register__id">${bug.id}</td>
              <td>${bug.title}</td>
              <td>${bug.severity}</td>
              <td>${statusTag(bug.status)}</td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>`,
    )}

    ${section(
      '05',
      'PROGRESS',
      progress.length
        ? ''
        : `<p class="empty">No QA entries yet — will be filled from the learning log.</p>`,
    )}
  </main>
`
