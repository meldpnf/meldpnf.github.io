import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="home">
    <h1 class="title">MÉLINA</h1>

    <section class="side side--creative">
      <h2>CREATIVE</h2>
      <ul>
        <li><a href="#">VISUALS</a></li>
        <li><a href="#">MUSIC</a></li>
        <li><a href="#">SOCIAL</a></li>
      </ul>
    </section>

    <div class="symbol"><span>image / symbol</span></div>

    <section class="side side--tech">
      <h2>TECH</h2>
      <ul>
        <li><a href="#">DEV</a></li>
        <li><a href="#">QA</a></li>
      </ul>
    </section>
  </main>
`
