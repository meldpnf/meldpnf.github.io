// Récupère les publications Instagram rangées par hashtag, télécharge toutes leurs
// images dans public/instagram/ et écrit src/data/instagram.json.
// Tourne sur ton ordinateur (Node), jamais dans le navigateur : le token reste privé.
// Lancer avec : npm run instagram
import { mkdir, writeFile } from 'node:fs/promises'

// Sur ton ordinateur, les clés sont dans .env.
// Sur GitHub Actions, il n'y a pas de .env : les clés arrivent déjà par les GitHub Secrets.
try {
  process.loadEnvFile('.env')
} catch {
  // Pas de .env : on continue, la vérification ci-dessous signale une clé manquante
}

const { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID } = process.env

if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
  console.error('Il manque une valeur dans .env ou dans les GitHub Secrets (voir .env.example).')
  process.exit(1)
}

const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}'

// Appelle Instagram. Le token passe dans l'en-tête, jamais dans un message d'erreur.
const getPage = async (url) => {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${INSTAGRAM_ACCESS_TOKEN}` } })
  const page = await response.json()
  if (page.error?.code === 190) throw new Error('Token Instagram expiré ou invalide : génère-en un nouveau.')
  if (!response.ok) throw new Error(`Erreur Instagram (${response.status}) : ${page.error?.message}`)
  return page
}

// 1. Récupère toutes les publications, page par page
const getPosts = async () => {
  const posts = []
  let url = `https://graph.facebook.com/v26.0/${INSTAGRAM_USER_ID}/media?fields=${FIELDS}&limit=50`
  while (url) {
    const page = await getPage(url)
    posts.push(...page.data)
    url = page.paging?.next
  }
  return posts
}

// Une vidéo n'a pas d'image directe : on prend sa miniature
const imageOf = (media) => (media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url)

// Un carrousel contient plusieurs médias, un post simple n'en contient qu'un
const mediasOf = (post) => post.children?.data ?? [post]

// Lit la largeur et la hauteur écrites au début d'un fichier JPEG.
// La page VISUALS s'en sert pour réserver la place de l'image avant son chargement.
const readJpegSize = (buffer) => {
  let offset = 2
  while (offset < buffer.length) {
    const marker = buffer[offset + 1]
    const isSizeMarker = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)
    if (isSizeMarker) return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) }
    offset += 2 + buffer.readUInt16BE(offset + 2)
  }
  throw new Error('Dimensions du JPEG introuvables.')
}

// Les liens d'images Instagram expirent : on garde une copie dans le projet
const saveImage = async (media, path) => {
  const response = await fetch(imageOf(media))
  if (!response.ok) throw new Error(`Image ${path} indisponible (${response.status}).`)
  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(`public${path}`, buffer)
  return { src: path, ...readJpegSize(buffer) }
}

// 2. Télécharge les images d'un post et ne garde que ce dont la page VISUALS a besoin
const savePost = async (post) => {
  const images = []
  for (const [index, media] of mediasOf(post).entries()) {
    images.push(await saveImage(media, `/instagram/${post.id}-${index + 1}.jpg`))
  }
  return { id: post.id, caption: post.caption, images, url: post.permalink, date: post.timestamp }
}

const allPosts = await getPosts()
const posts = allPosts.filter((post) => /#meily_(main|astrology|collab)\b/i.test(post.caption ?? ''))

await mkdir('public/instagram', { recursive: true })
const saved = []
for (const post of posts) saved.push(await savePost(post))

await writeFile('src/data/instagram.json', `${JSON.stringify(saved, null, 2)}\n`)
const imageCount = saved.reduce((total, post) => total + post.images.length, 0)
console.log(`${allPosts.length} publication(s) reçue(s), ${saved.length} rangée(s) par hashtag, ${imageCount} image(s), enregistré dans src/data/instagram.json`)
