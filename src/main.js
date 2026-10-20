import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="home">
    <h1 class="title" aria-label="MÉLINA">
      <span class="title__creative" aria-hidden="true">MÉL</span><span class="title__tech" aria-hidden="true">INA</span>
    </h1>

    <section class="side side--creative">
      <h2>CREATIVE</h2>
      <ul>
        <li><a href="/visuals/">VISUALS</a></li>
        <li><a href="/music/">MUSIC</a></li>
        <li><a href="/social/meily/">SOCIAL</a></li>
      </ul>
    </section>

    <div class="symbol"><span>image / symbol</span></div>

    <section class="side side--tech">
      <h2>TECH</h2>
      <ul>
        <li><a href="/dev/">DEV</a></li>
        <li><a href="/qa/">QA</a></li>
      </ul>
    </section>
  </main>
`
