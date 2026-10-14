import './style.css'
import './visuals.css'

// Posts locaux provisoires, sous la même forme que les futurs posts Instagram.
// Plus tard, cette liste sera remplacée par la réponse de l'API : rien d'autre ne change.
// - la 1re ligne de la caption = titre court affiché (« Art Experiment 01 »)
// - le hashtag de la caption = galerie où le post est rangé (jamais le numéro)
// - `ratio` sert seulement aux placeholders, en attendant les vraies images (`cover`)
const posts = [
  { id: 'p1', caption: 'Art Experiment 01\nPlaceholder caption #meily_main', ratio: '4 / 5' },
  { id: 'p2', caption: 'Art Experiment 02\nPlaceholder caption #meily_astrology', ratio: '1 / 1' },
  { id: 'p3', caption: 'Art Experiment 03\nPlaceholder caption #meily_main', ratio: '3 / 4' },
  { id: 'p4', caption: 'Art Experiment 04\nPlaceholder caption #meily_main', ratio: '4 / 3' },
  { id: 'p5', caption: 'Art Experiment 05\nPlaceholder caption #meily_astrology', ratio: '2 / 3' },
  { id: 'p6', caption: 'Art Experiment 06\nPlaceholder caption #meily_astrology', ratio: '1 / 1' },
  { id: 'p7', caption: 'Collab 01\nPlaceholder caption #meily_collab', ratio: '3 / 4' },
  { id: 'p8', caption: 'Collab 02\nPlaceholder caption #meily_collab', ratio: '1 / 1' },
]

// Titre court : la première ligne de la caption
const getTitle = (post) => post.caption.split('\n')[0]

// Garde seulement les posts qui contiennent ce hashtag
const withHashtag = (hashtag) => posts.filter((post) => post.caption.includes(hashtag))

// Une carte = la couverture + le titre court. `data-id` servira plus tard
// à ouvrir la vue détaillée (carrousel + caption complète) du bon post.
const card = (post) => `
  <figure class="card" data-id="${post.id}">
    <div class="card__cover card__cover--placeholder" style="aspect-ratio: ${post.ratio}">
      <span>Image placeholder</span>
    </div>
    <figcaption class="card__title">${getTitle(post)}</figcaption>
  </figure>
`

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
