import { flow, heading, kicker, metric, note, placeholder, renderSocialPage, shot, tags, text } from './social.js'

const img = (name) => `/social/cathy/${name}.jpg`

// Une ligne de l'avant / après : le sujet, puis les deux versions côte à côte
const compare = (topic, before, after) => `
  <p class="ba__topic">${topic}</p>
  <div class="ba__cell">${before}</div>
  <div class="ba__cell ba__cell--after">${after}</div>
`

const hero = `
  <header class="c-hero">
    <img class="avatar" src="${img('logo')}" alt="Les Trainings de Cathy logo" />
    <div>
      <h2 class="case__title">CATHY</h2>
      <p class="case__subtitle">Communication Strategy &amp; Identity Redesign</p>
      <p class="case__lead">Pilates &amp; fitness coach around Saintes. Consolidating an existing identity into structured communication focused on bringing in new clients.</p>
      <p class="c-scope">Strategy · Identity refinement · Content production · Campaign planning · Local promotion · Analytics</p>
      ${note('Cathy remains in charge of client relations, registrations and most DMs / client contacts.')}
    </div>
  </header>
`

const context = `
  <section class="c-section" id="context">
    ${heading('CONTEXT &amp; CHALLENGE', '01')}
    <div class="c-cols">
      <div>
        ${text('A mostly local audience: women, mums, and women wanting to start or keep up a physical activity.')}
        ${text('She already had a logo and a yellow / white / black / red palette. My work was a <strong>redesign and consolidation</strong> — not a creation from scratch.')}
      </div>
      <div>
        ${kicker('Starting point')}
        <ul class="c-list">
          <li>Account active for several years — <strong>363 followers</strong></li>
          <li>Professional content, but a feed that felt unstructured</li>
          <li>An existing but fragile identity</li>
          <li>Irregular communication</li>
          <li>Lack of visibility and clients</li>
        </ul>
      </div>
    </div>

    <div class="ba">
      <span class="ba__label">BEFORE</span>
      <span class="ba__label ba__label--after">AFTER</span>
      ${compare(
        'Instagram profile',
        shot({ src: img('profile-before'), alt: 'Instagram profile before', caption: '363 followers' }),
        shot({ src: img('profile-after'), alt: 'Instagram profile after', caption: '409 followers' }),
      )}
      ${compare(
        'Feed',
        shot({ src: img('feed-before'), alt: 'Instagram feed before' }),
        shot({ src: img('feed-after'), alt: 'Instagram feed after' }),
      )}
      ${compare(
        'Cover',
        shot({ src: img('cover-before'), alt: 'Former Facebook cover' }),
        `<div class="ba__cover">
          ${shot({ src: img('cover-after'), alt: 'New Facebook cover reusing the logo and palette' })}
          ${shot({ src: img('story-after'), alt: 'Cover adapted to 9:16 for an Instagram highlight' })}
        </div>`,
      )}
    </div>
    ${note('Same logo and palette, used more consistently — the cover is also adapted to 9:16 for Instagram highlights.')}
  </section>
`

const pillars = [
  { title: 'EDUCATIONAL', body: 'Educational reels and carousels.' },
  { title: 'CLASSES &amp; SERVICES', body: 'Classes, disciplines, locations and offers.' },
  { title: 'CALL TO ACTION', body: 'First class free, trials, invitations, acquisition campaigns.' },
]

const strategy = `
  <section class="c-section" id="strategy">
    ${heading('STRATEGY', '02')}
    ${tags(['Identity refinement', 'Feed structure', 'Templates', 'Typography', 'Planning', 'Editorial strategy'])}
    <div class="pillars">
      ${pillars.map((pillar) => `<article class="pillar"><h4>${pillar.title}</h4>${text(pillar.body)}</article>`).join('')}
    </div>
    <p class="c-friday">
      <strong>Every Friday</strong> — a strategy meeting to review Cathy’s activity, opportunities, content needs
      and results, then turn them into a structured communication plan.
    </p>
  </section>
`

const production = `
  <section class="c-section" id="production">
    ${heading('CONTENT PRODUCTION', '03')}
    <div class="process">
      ${kicker('Video')}
      ${flow([
        'Class filming / raw content',
        'Sequence selection',
        'Editing + original music when relevant',
        'Caption, hashtags &amp; publishing strategy',
        'Cathy validation',
        'Schedule / publish',
        'Analyse',
      ])}
      ${note('One filming session feeds several videos. CapCut · DaVinci Resolve · Suno')}
    </div>
    <div class="process">
      ${kicker('Carousels / stories')}
      ${flow([
        'Topic / purpose',
        'Content + visual creation',
        'Publishing strategy',
        'Cathy validation',
        'Schedule / publish',
        'Analyse',
      ])}
      ${note('Photoshop · ChatGPT')}
    </div>
    ${note('Publishing strategy = caption, hashtags, timing and planning. Scheduling and analytics: Meta Business Suite.')}
  </section>
`

const campaign = `
  <section class="c-section" id="campaign">
    ${heading('CAMPAIGNS &amp; LOCAL COMMUNICATION', '04')}
    <div class="summer">
      <div class="summer__text">
        <p class="summer__title">SUMMER DISCOVERY 2026</p>
        <ul class="c-list">
          <li>Cathy had obtained new locations</li>
          <li>New trial sessions were planned</li>
          <li>Together, we chose which existing and new disciplines to offer</li>
          <li>I then built about one month of communication around this offer</li>
        </ul>
        ${tags(['Planning', 'Content', 'Visuals', 'Posts', 'Calls to action', 'Local communication', 'Analysis'])}
      </div>
      ${placeholder('Notion planning screenshot', '16 / 10')}
    </div>

    <div class="c-local">
      <div class="c-case">
        ${kicker('Local Facebook groups')}
        ${text('Campaign posts and visuals shared in local community groups, adapted to each activity and location.')}
      </div>
      <div class="c-case">
        ${kicker('Case — Courcoury')}
        ${flow([
          'Posts seen online by the town hall',
          'Town hall contacts me',
          'Digital visuals adapted into print-ready flyers / leaflets',
          'Files sent to the town hall',
        ])}
        ${note('Printing and distribution were handled by the town hall.')}
      </div>
    </div>
  </section>
`

const results = `
  <section class="c-section" id="results">
    ${heading('RESULTS', '05')}
    <div class="c-results">
      <div class="c-results__main">${metric({ label: 'new clients', prefix: '+ ' })}</div>
      <div class="c-results__platform">
        ${kicker('Instagram')}
        <div class="metrics">
          ${metric({ label: 'views (+82.8%)', value: '22.2K' })}
          ${metric({ label: 'interactions (+255%)', value: '899' })}
          ${metric({ label: 'followers gained', value: '134', prefix: '+ ' })}
        </div>
      </div>
      <div class="c-results__platform">
        ${kicker('Facebook')}
        <div class="metrics">
          ${metric({ label: 'views', value: '68K' })}
          ${metric({ label: 'followers gained', value: '315', prefix: '+ ' })}
          ${metric({ label: 'link clicks', value: '692' })}
        </div>
      </div>
    </div>
    ${note('Meta Business Suite, since January 2026 — percentages compared with the previous period. New clients: figure to be confirmed with Cathy.')}
  </section>
`

renderSocialPage('cathy', `${hero}${context}${strategy}${production}${campaign}${results}`)
