import './style.css'
import './visuals.css'
import posts from './data/instagram.json'

// Titre court : la première ligne de la caption
const getTitle = (post) => post.caption.split('\n')[0].trim()

// Le texte vient d'Instagram : on évite qu'il soit lu comme du HTML
const escapeHtml = (text) =>
  text.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char])

// Garde seulement les posts qui contiennent ce hashtag
const withHashtag = (hashtag) => posts.filter((post) => post.caption.toLowerCase().includes(hashtag))

// Une carte = la couverture + le titre court. `data-id` servira plus tard
// à ouvrir la vue détaillée (carrousel + caption complète) du bon post.
const card = (post) => {
  const title = escapeHtml(getTitle(post))
  return `
    <figure class="card" data-id="${post.id}">
      <div class="card__cover">
        <img src="${post.images[0].src}" alt="${title}" loading="lazy" />
      </div>
      <figcaption class="card__title">${title}</figcaption>
    </figure>
  `
}

const gallery = (hashtag) => `<div class="gallery">${withHashtag(hashtag).map(card).join('')}</div>`

document.querySelector('#app').innerHTML = `
  <main class="visuals">
    <a class="back" href="/">← MÉLINA</a>

    <header class="visuals__header">
      <h1>VISUALS</h1>
      <p>Visual experiments, characters and collaborations.</p>
    </header>

    <section class="series">
      <h2>ART EXPERIMENTS</h2>

      <h3>MAIN</h3>
      ${gallery('#meily_main')}

      <h3>ASTROLOGY</h3>
      ${gallery('#meily_astrology')}
    </section>

    <section class="series">
      <h2>COLLABS</h2>
      ${gallery('#meily_collab')}
    </section>
  </main>
`
