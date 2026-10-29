import { siInstagram, siPinterest, siSpotify, siTiktok, siYoutube } from 'simple-icons'
import { heading, kicker, metric, note, platformLink, renderSocialPage, tags, text } from './social.js'

const platforms = {
  instagram: { name: 'Instagram', href: 'https://www.instagram.com/bymei.ly/', icon: siInstagram },
  tiktok: { name: 'TikTok', href: 'https://www.tiktok.com/@bymei.ly', icon: siTiktok },
  youtube: { name: 'YouTube', href: 'https://www.youtube.com/@bymeily', icon: siYoutube },
  pinterest: { name: 'Pinterest', href: 'https://fr.pinterest.com/bymeily/', icon: siPinterest },
  spotify: { name: 'Spotify', href: 'https://open.spotify.com/intl-fr/artist/4dTGD91bsXIOudcBAI16EB', icon: siSpotify },
}

// Chiffres réels (Spotify for Artists). Pour en ajouter : une ligne ici.
const metrics = [
  { label: 'listeners (+382.9%)', value: '676' },
  { label: 'streams (+333.3%)', value: '1.2K' },
  { label: 'playlist adds (+111.1%)', value: '38' },
]

const hero = `
  <header class="m-hero">
    <img class="avatar" src="/social/meily/meily.jpg" alt="Meily, the character behind the project" />
    <div class="m-hero__text">
      <h2 class="case__title">MEILY</h2>
      <p class="case__subtitle">Creative &amp; Strategic Lab</p>
      <p class="case__lead">A character-led project mixing music, visuals and storytelling — directed independently, with AI as a creative tool.</p>
      <nav class="platforms" aria-label="Meily on social media">
        ${Object.values(platforms).map(platformLink).join('')}
      </nav>
    </div>
  </header>
`

const about = `
  <section class="m-about" id="about">
    ${heading('ABOUT')}
    <p class="m-about__story">
      Meily started as a <em>creative hobby</em>: an AI-assisted character used to play with images and sound.
      It slowly became a <em>creative &amp; strategic lab</em> — music, visuals, storytelling, distribution,
      promotion and audience development.
    </p>
    <div class="m-about__side">
      ${text('Meily is a recurring character who carries different stories, emotions and worlds. The project is not locked into one genre: consistency comes from the character, the emotional intention and the art direction.')}
      ${text('Some projects are built with other artists — lyrics, cover art, voice — while I keep the overall coordination.')}
    </div>
    <div class="m-about__role">
      ${kicker('My role')}
      ${tags(['Creative direction', 'Music', 'Visuals', 'Storytelling', 'Production', 'Distribution', 'Promotion', 'Strategy'])}
    </div>
  </section>
`

const workflow = `
  <section class="m-workflow" id="workflow">
    ${heading('AI-ASSISTED CREATIVE WORKFLOW')}
    <div class="bubbles">
      <article class="bubble">
        <h4>MUSIC</h4>
        ${text('Concept, lyrics, sound direction, generation, selection, iteration, editing.')}
        ${tags(['Suno', 'ChatGPT', 'DaVinci Resolve / Fairlight'])}
      </article>
      <article class="bubble">
        <h4>VISUALS</h4>
        ${text('Concept, references, direction, AI generation, iterations, final refinement.')}
        ${tags(['AI image generation', 'Photoshop'])}
      </article>
      <article class="bubble">
        <h4>VIDEO</h4>
        ${text('Short-form video creation and editing.')}
        ${tags(['CapCut', 'DaVinci Resolve'])}
      </article>
    </div>
    ${note('AI is a production and exploration tool — not the source of the creative direction.')}
  </section>
`

// Les grandes étapes d'une sortie (--i : position de l'étape, utilisée pour le dégradé violet)
const stages = [
  { title: 'CREATE', body: 'Concept, lyrics, sound direction, generation' },
  { title: 'REFINE', body: 'Selection, iteration, editing, audio adjustments' },
  { title: 'DISTRIBUTE &amp; PITCH', body: 'DistroKid, Spotify for Artists, release preparation' },
  { title: 'VIDEO + SPOTIFY CANVAS', body: 'Short-form video, Spotify Canvas' },
  { title: 'RELEASE + SOCIAL PUBLISHING', body: 'Release, short-form video publishing' },
  { title: 'CURATORS + RADIO', body: 'Curators, playlists, radio and discovery platforms' },
  { title: 'ANALYSE &amp; ADJUST', body: 'Results, feedback and adjustments for future releases' },
]

const release = `
  <section class="m-release" id="release">
    ${heading('RELEASE &amp; PROMOTION')}
    <ol class="stages">
      ${stages
        .map(
          (stage, i) => `
        <li class="stage" style="--i: ${i}">
          <span class="stage__number">0${i + 1}</span>
          <h4>${stage.title}</h4>
          <p>${stage.body}</p>
        </li>`,
        )
        .join('')}
    </ol>
    ${text('I pick curators for musical fit, audience, credibility, cost and past results — then adjust future submissions based on their feedback.')}
    ${note('DistroKid · Spotify for Artists · curator platforms · radio / discovery platforms')}
  </section>
`

const presence = `
  <section class="m-presence" id="presence">
    ${heading('SOCIAL PRESENCE')}
    <div class="channels">
      <article class="channel">
        ${kicker('Main creative hub')}
        ${text('Visuals, music and collaborations in one place.')}
        <div class="platforms">${platformLink(platforms.instagram)}</div>
      </article>
      <article class="channel">
        ${kicker('Short music video distribution')}
        ${text('The clips released with each song.')}
        <div class="platforms">${platformLink(platforms.tiktok)}${platformLink({ ...platforms.youtube, name: 'YouTube Shorts' })}</div>
      </article>
    </div>
  </section>
`

const growth = `
  <section class="m-growth" id="growth">
    ${heading('GROWTH')}
    <div class="growth">
      <div class="metrics">${metrics.map(metric).join('')}</div>
      <ul class="growth__list">
        <li>Growing music listenership</li>
        <li>Discovery through curator submissions</li>
        <li>Recurring creative community interactions</li>
        <li>Collaborations &amp; an increasingly structured workflow</li>
      </ul>
    </div>
    ${note('Spotify for Artists, 21 Sep – 18 Oct 2026 (28 days), compared with the previous period.')}
  </section>
`

renderSocialPage('meily', `${hero}${about}${workflow}${release}${presence}${growth}`)
