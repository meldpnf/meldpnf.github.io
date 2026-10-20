import './style.css'
import './social.css'

// Partie commune aux pages SOCIAL (MEILY, CATHY) : en-tête, navigation entre projets
// et petits blocs de mise en page réutilisés par les deux case studies.

// Pour ajouter un projet : une ligne ici + un dossier social/<key>/ (et vite.config.js)
const projects = [
  { key: 'meily', name: 'MEILY', href: '/social/meily/' },
  { key: 'cathy', name: 'CATHY', href: '/social/cathy/' },
]

// Onglets de projets : `aria-current` signale le projet affiché (style + lecteurs d'écran)
const projectNav = (current) => `
  <nav class="projects" aria-label="Projects">
    ${projects
      .map(
        (project) => `
      <a class="project-tab" href="${project.href}"${project.key === current ? ' aria-current="page"' : ''}>
        ${project.name}
      </a>`,
      )
      .join('')}
  </nav>
`

// Affiche la page : en-tête SOCIAL commun + contenu propre au projet
export const renderSocialPage = (current, content) => {
  document.querySelector('#app').innerHTML = `
    <main class="social social--${current}">
      <a class="back" href="/">← MÉLINA</a>

      <header class="social__header">
        <h1>SOCIAL</h1>
        <p>Strategy, communication &amp; project development.</p>
      </header>

      ${projectNav(current)}

      ${content}
    </main>
  `
}

// ─── Petits blocs réutilisés par les deux pages ───

// Titre de section : numéro facultatif + nom
export const heading = (title, number = '') => `
  <h3 class="heading">${number ? `<span class="heading__number">${number}</span>` : ''}${title}</h3>
`

export const kicker = (text) => `<p class="kicker">${text}</p>`

export const text = (content) => `<p class="text">${content}</p>`

// Mots-clés en petites pastilles
export const tags = (items) => `
  <ul class="tags">${items.map((item) => `<li>${item}</li>`).join('')}</ul>
`

// Étapes d'un processus, reliées par des flèches
export const flow = (steps) => `
  <ol class="flow">${steps.map((step) => `<li>${step}</li>`).join('')}</ol>
`

// Petite note grise (sources, précisions, données à venir)
export const note = (content) => `<p class="note">${content}</p>`

// Image avec légende facultative (`ratio` force un format, ex. '9 / 16' pour une capture de téléphone)
export const shot = ({ src, alt, caption = '', ratio = '' }) => `
  <figure class="shot">
    <img src="${src}" alt="${alt}" loading="lazy"${ratio ? ` style="aspect-ratio: ${ratio}"` : ''} />
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>
`

// Emplacement provisoire pour une image pas encore fournie
export const placeholder = (label, ratio = '4 / 3') => `
  <div class="placeholder" style="aspect-ratio: ${ratio}"><span>${label}</span></div>
`

// Chiffre : la valeur reste « [ X ] » tant qu'elle n'est pas renseignée
export const metric = ({ label, value = null, prefix = '' }) => `
  <div class="metric${value === null ? ' metric--empty' : ''}">
    <span class="metric__value">${prefix}${value ?? '[ X ]'}</span>
    <span class="metric__label">${label}</span>
  </div>
`

// Bouton vers une plateforme, avec son logo (même principe que la page MUSIC).
// `icon` vient de Simple Icons : forme + couleur officielle de la marque.
export const platformLink = ({ name, href, icon }) => `
  <a class="platform" href="${href}" target="_blank" rel="noopener noreferrer">
    <svg class="platform__logo" viewBox="0 0 24 24" fill="#${icon.hex}" aria-hidden="true"><path d="${icon.path}"/></svg>
    <span>${name}</span>
  </a>
`
