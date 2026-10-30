import './style.css'
import './music.css'
import { siApplemusic, siDeezer, siSpotify, siYoutubemusic } from 'simple-icons'
// Discographie générée par `npm run music` (voir scripts/fetch-music.js)
// Chaque sortie : trackKey, title, type, cover, releaseDate, url, video (id du Short YouTube ou null)
import discography from './data/discography.json'

// Pages artiste générales : à remplir avec les vraies adresses.
// Tant qu'une adresse est vide, le lien s'affiche grisé et n'est pas cliquable.
// `icon` = logo (forme + couleur officielle, venant de Simple Icons) ; All platforms n'en a pas.
const platforms = [
  { name: 'Spotify', url: 'https://open.spotify.com/intl-fr/artist/4dTGD91bsXIOudcBAI16EB', icon: siSpotify },
  { name: 'Apple Music', url: 'https://music.apple.com/us/artist/meily/1882207700', icon: siApplemusic },
  { name: 'YouTube Music', url: 'https://music.youtube.com/@bymeily', icon: siYoutubemusic },
  { name: 'Deezer', url: 'https://www.deezer.com/fr/artist/406601402', icon: siDeezer },
  { name: 'All platforms', url: '', icon: null },
]


const tracks = discography

// Petit logo dessiné en SVG, dans la couleur officielle de la marque
const logo = (icon) =>
  icon
    ? `<svg class="platform__logo" viewBox="0 0 24 24" fill="#${icon.hex}" aria-hidden="true"><path d="${icon.path}"/></svg>`
    : ''

const platformLink = (platform) => {
  const content = `${logo(platform.icon)}<span>${platform.name}</span>`
  return platform.url
    ? `<a class="platform" href="${platform.url}" target="_blank" rel="noopener noreferrer">${content}</a>`
    : `<span class="platform platform--disabled">${content}</span>`
}

// Zone du clip : miniature du Short (le lecteur s'ouvre en grand au clic),
// ou mention discrète s'il n'y en a pas
const videoSlot = (track) =>
  track.video
    ? `<button class="track__video" type="button" data-video="${track.video}" aria-label="Play the video of ${track.title}">
        <img src="https://i.ytimg.com/vi/${track.video}/hqdefault.jpg" alt="" loading="lazy" />
        <span class="track__play" aria-hidden="true">▶</span>
      </button>`
    : `<div class="track__no-video">No video</div>`

// Pochette Spotify, ou emplacement vide si elle n'est pas encore connue
const coverSlot = (track) =>
  track.cover
    ? `<img class="track__cover" src="${track.cover}" alt="Cover of ${track.title}" loading="lazy" />`
    : `<div class="track__cover placeholder"><span>Cover</span></div>`

// Le titre mène vers le morceau sur Spotify quand le lien est connu
const titleLink = (track) =>
  track.url ? `<a href="${track.url}" target="_blank" rel="noopener noreferrer">${track.title}</a>` : track.title

// Une musique = une ligne : cover, titre (+ date), clip
const trackRow = (track) => `
  <li class="track" data-track="${track.trackKey}">
    ${coverSlot(track)}
    <div class="track__info">
      <h3 class="track__title">${titleLink(track)}</h3>
      ${track.releaseDate ? `<span class="track__date">${track.releaseDate}</span>` : ''}
    </div>
    ${videoSlot(track)}
  </li>
`

document.querySelector('#app').innerHTML = `
  <main class="music">
    <a class="back" href="/">← MÉLINA</a>

    <header class="music__header">
      <h1>MUSIC</h1>
      <p>Songs, sounds and music videos.</p>
      <nav class="platforms" aria-label="Artist pages">
        ${platforms.map(platformLink).join('')}
      </nav>
    </header>

    <section>
      <h2>RELEASES</h2>
      <ul class="tracks">
        ${tracks.map(trackRow).join('')}
      </ul>
    </section>
  </main>

  <dialog class="player" aria-label="Video player">
    <button class="player__close" type="button" aria-label="Close the video">×</button>
    <iframe class="player__frame" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>
  </dialog>
`

// Fenêtre de lecture : <dialog> gère déjà la touche Échap et le fond assombri
const player = document.querySelector('.player')
const frame = player.querySelector('.player__frame')

document.querySelectorAll('[data-video]').forEach((button) => {
  button.addEventListener('click', () => {
    frame.src = `https://www.youtube-nocookie.com/embed/${button.dataset.video}?autoplay=1`
    player.showModal()
  })
})

player.querySelector('.player__close').addEventListener('click', () => player.close())

// Clic à côté de la vidéo (sur le fond) = fermer
player.addEventListener('click', (event) => {
  if (event.target === player) player.close()
})

// À la fermeture (×, Échap ou clic à côté), on vide le lecteur pour couper le son
player.addEventListener('close', () => {
  frame.src = ''
})
