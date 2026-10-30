// Récupère la discographie Spotify + les Shorts YouTube et écrit src/data/discography.json.
// Tourne sur ton ordinateur (Node), jamais dans le navigateur : les clés restent privées.
// Lancer avec : npm run music
import { writeFile } from 'node:fs/promises'

try {
  process.loadEnvFile('.env')
} catch {
  console.error('Fichier .env introuvable (voir .env.example).')
  process.exit(1)
}

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_ARTIST_ID, YOUTUBE_API_KEY } = process.env

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_ARTIST_ID || !YOUTUBE_API_KEY) {
  console.error('Il manque une valeur dans .env (voir .env.example).')
  process.exit(1)
}

// Chaîne YouTube où chercher les Shorts
const YOUTUBE_HANDLE = 'bymeily'

// 1. Demande un jeton d'accès temporaire à Spotify (valable 1 h)
const getToken = async () => {
  const credentials = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!response.ok) throw new Error(`Jeton refusé (${response.status}) : vérifie le Client ID / Secret.`)
  return (await response.json()).access_token
}

// 2. Récupère toutes les sorties (albums + singles), page par page
const getReleases = async (token) => {
  const releases = []
  let url = `https://api.spotify.com/v1/artists/${SPOTIFY_ARTIST_ID}/albums?include_groups=album,single&limit=10`
  while (url) {
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
    if (!response.ok) throw new Error(`Erreur Spotify (${response.status}) sur ${url}`)
    const page = await response.json()
    releases.push(...page.items)
    url = page.next
  }
  return releases
}

// "World of Shadows" -> "worldofshadows" : sert à rattacher un clip au bon morceau
const toTrackKey = (title) =>
  title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

// 3. Ne garde que ce dont la page MUSIC a besoin, du plus récent au plus ancien
const simplify = (release) => ({
  trackKey: toTrackKey(release.name),
  title: release.name,
  type: release.album_type,
  cover: release.images[0]?.url ?? null,
  releaseDate: release.release_date,
  url: release.external_urls.spotify,
})

// 4. YouTube : liste toutes les vidéos de la chaîne et repère le hashtag
//    #meily_track_<trackKey> dans la description => { onethought: 'idVideo', ... }
const youtube = async (endpoint, params) => {
  const query = new URLSearchParams({ ...params, key: YOUTUBE_API_KEY })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${query}`)
  if (!response.ok) throw new Error(`Erreur YouTube (${response.status}) sur ${endpoint} : vérifie la clé API.`)
  return response.json()
}

const getVideosByTrack = async () => {
  const channel = await youtube('channels', { part: 'contentDetails', forHandle: YOUTUBE_HANDLE })
  const uploads = channel.items?.[0]?.contentDetails.relatedPlaylists.uploads
  if (!uploads) throw new Error(`Chaîne YouTube @${YOUTUBE_HANDLE} introuvable.`)

  const videos = {}
  let pageToken = ''
  do {
    const page = await youtube('playlistItems', { part: 'snippet', playlistId: uploads, maxResults: 50, pageToken })
    for (const item of page.items) {
      const match = item.snippet.description.match(/#meily_track_([a-z0-9]+)/i)
      const trackKey = match?.[1].toLowerCase()
      // Vidéos les plus récentes en premier : on garde la première trouvée par morceau
      if (trackKey && !videos[trackKey]) videos[trackKey] = item.snippet.resourceId.videoId
    }
    pageToken = page.nextPageToken
  } while (pageToken)
  return videos
}

const token = await getToken()
const videos = await getVideosByTrack()
const discography = (await getReleases(token))
  .map(simplify)
  .map((release) => ({ ...release, video: videos[release.trackKey] ?? null }))
  .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))

// Hashtags qui ne correspondent à aucun morceau Spotify (souvent une faute de frappe)
const unknown = Object.keys(videos).filter((key) => !discography.some((release) => release.trackKey === key))
if (unknown.length) console.warn(`Hashtag sans morceau correspondant : ${unknown.join(', ')}`)

await writeFile('src/data/discography.json', `${JSON.stringify(discography, null, 2)}\n`)
const withVideo = discography.filter((release) => release.video).length
console.log(`${discography.length} sortie(s), dont ${withVideo} avec un Short, enregistrée(s) dans src/data/discography.json`)
