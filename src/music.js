import './style.css'
import './music.css'
import { siApplemusic, siDeezer, siSpotify, siYoutubemusic } from 'simple-icons'

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

// Morceaux locaux provisoires. Plus tard, cette liste viendra de Spotify,
// et le clip sera rattaché au bon morceau grâce à `trackKey`
// (hashtag #meily_track_<trackKey> dans la description du clip).
// - cover : image du morceau (null = placeholder)
// - releaseDate : null tant qu'elle n'est pas renseignée
// - video : un seul clip par morceau, null = pas de clip
const tracks = [
  { trackKey: 'onethought', title: 'One Thought', cover: null, releaseDate: null, video: 'placeholder' },
  { trackKey: 'worldofshadows', title: 'World of Shadows', cover: null, releaseDate: null, video: 'placeholder' },
  { trackKey: 'rareststar', title: 'Rarest Star', cover: null, releaseDate: null, video: null },
]

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

// Zone du clip : emplacement vidéo, ou mention discrète s'il n'y en a pas
const videoSlot = (track) =>
  track.video
    ? `<div class="track__video placeholder"><span>Video placeholder</span></div>`
    : `<div class="track__no-video">No video</div>`

// Une musique = une ligne : cover, titre (+ date), clip
const trackRow = (track) => `
  <li class="track" data-track="${track.trackKey}">
    <div class="track__cover placeholder"><span>Cover</span></div>
    <div class="track__info">
      <h3 class="track__title">${track.title}</h3>
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
`
