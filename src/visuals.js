import './style.css'
import './visuals.css'
import instagramPosts from './data/instagram.json'
import collabs from './data/collabs.json'
import layout from './data/visuals-layout.json'
import { placePosts } from './visuals-placement.js'

// Les collabs publiées par d'autres créateurs sont notées à la main : le token Instagram
// ne donne pas accès à leurs posts, et `npm run instagram` réécrit instagram.json
const posts = [...instagramPosts, ...collabs]

// Titre court : la première ligne de la caption
const getTitle = (post) => post.caption.split('\n')[0].trim()

// Le texte vient d'Instagram : on évite qu'il soit lu comme du HTML
const escapeHtml = (text) =>
  text.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char])

// Garde seulement les posts qui contiennent ce hashtag
const withHashtag = (hashtag) => posts.filter((post) => post.caption.toLowerCase().includes(hashtag))

// Une image du post, à sa taille d'origine
const slide = ({ src, width, height }, alt, className = '') =>
  `<img class="${className}" src="${src}" alt="${alt}" width="${width}" height="${height}" loading="lazy" />`

// Écart de format à partir duquel une slide n'est plus recadrée, mais montrée en entier
const MAX_RATIO_GAP = 0.02

// Vrai si le format de cette image est trop loin de celui de la cover
const differsFromCover = (image, cover) =>
  Math.abs(image.width / image.height - cover.width / cover.height) > MAX_RATIO_GAP

// Plusieurs images : une bande qui défile dans le cadre, des flèches et un compteur
const carousel = (post, title) => {
  const slides = post.images.map((image, index) =>
    slide(image, `${title}, image ${index + 1}`, differsFromCover(image, post.images[0]) ? 'slide--whole' : ''),
  )
  return `
    <div class="carousel__track">${slides.join('')}</div>
    <button class="carousel__arrow carousel__arrow--prev" type="button" aria-label="Image précédente" hidden>←</button>
    <button class="carousel__arrow carousel__arrow--next" type="button" aria-label="Image suivante">→</button>
    <span class="carousel__count">1 / ${post.images.length}</span>
  `
}

// Crédit d'une collab publiée par un autre créateur, avec le lien vers son post
const credit = (post) =>
  post.creator
    ? `<a class="card__credit" href="${post.url}" target="_blank" rel="noopener">with @${escapeHtml(post.creator)}</a>`
    : ''

// Une carte = le cadre + le titre court. Le format de la cover fixe la taille du cadre :
// changer de slide ne peut donc ni agrandir la tuile, ni déplacer les autres.
const card = (post) => {
  const title = escapeHtml(getTitle(post))
  const [cover] = post.images
  const hasSlides = post.images.length > 1
  return `
    <figure class="card" data-id="${post.id}">
      <div class="card__cover" style="aspect-ratio: ${cover.width} / ${cover.height}">
        ${hasSlides ? carousel(post, title) : slide(cover, title)}
      </div>
      <figcaption class="card__title">${title}${credit(post)}</figcaption>
    </figure>
  `
}

// Une galerie = trois colonnes, remplies par la règle de placement
const gallery = (hashtag) => {
  const columns = placePosts(withHashtag(hashtag), layout[hashtag])
  const html = columns.map((column) => `<div class="gallery__column">${column.map(card).join('')}</div>`)
  return `<div class="gallery">${html.join('')}</div>`
}

// Branche les flèches et le compteur d'un carrousel. Le swipe est celui du navigateur :
// on lit simplement la position de la bande pour savoir quelle slide est affichée.
const setupCarousel = (track) => {
  const cover = track.parentElement
  const previous = cover.querySelector('.carousel__arrow--prev')
  const next = cover.querySelector('.carousel__arrow--next')
  const count = cover.querySelector('.carousel__count')
  const total = track.children.length

  const currentIndex = () => Math.round(track.scrollLeft / track.clientWidth)

  const goTo = (index) => track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })

  const update = () => {
    // Bande sans largeur (masquée un instant) : impossible de savoir où on en est
    if (track.clientWidth === 0) return
    const index = currentIndex()
    count.textContent = `${index + 1} / ${total}`
    // Au clavier, on garde le focus sur la flèche qui reste visible
    if (index === 0 && document.activeElement === previous) next.focus()
    if (index === total - 1 && document.activeElement === next) previous.focus()
    previous.hidden = index === 0
    next.hidden = index === total - 1
  }

  previous.addEventListener('click', () => goTo(currentIndex() - 1))
  next.addEventListener('click', () => goTo(currentIndex() + 1))
  track.addEventListener('scroll', update, { passive: true })
  // La bande peut revenir au début sans défiler : on recale aussi quand sa taille change
  new ResizeObserver(update).observe(track)
}

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

document.querySelectorAll('.carousel__track').forEach(setupCarousel)
