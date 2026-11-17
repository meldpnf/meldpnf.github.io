import './style.css'
import './contact.css'

// Types de demande proposés dans le formulaire
const enquiries = ['Creative project', 'Music / collaboration', 'Social media / communication', 'Tech / QA', 'Other']

document.querySelector('#app').innerHTML = `
  <main class="contact">
    <a class="back" href="/">← MÉLINA</a>

    <h1 class="contact__title" aria-label="CONTACT">
      <span class="contact__creative" aria-hidden="true">CONT</span><span aria-hidden="true">ACT</span>
    </h1>

    <form class="form">
      <div class="field">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" autocomplete="name" required />
      </div>

      <div class="field">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" required />
      </div>

      <fieldset class="field">
        <legend>Subject</legend>
        <div class="choices">
          ${enquiries
            .map(
              (enquiry, i) => `
          <label class="choice">
            <input type="radio" name="subject" value="${enquiry}"${i === 0 ? ' required' : ''} />
            <span>${enquiry}</span>
          </label>`,
            )
            .join('')}
        </div>
      </fieldset>

      <div class="field">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="6" required></textarea>
      </div>

      <button class="form__send" type="submit">SEND</button>
      <p class="form__status" role="status"></p>
    </form>

    <p class="direct"><a href="mailto:melkhes@gmail.com">melkhes@gmail.com</a></p>
  </main>
`

// Le navigateur vérifie d'abord les champs (remplis, email valide).
// Aucun service d'envoi n'est encore branché : on bloque l'envoi et on le dit clairement.
const form = document.querySelector('.form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  form.querySelector('.form__status').textContent = 'Sending is not connected yet.'
})
