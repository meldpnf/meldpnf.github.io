// Décide dans quelle colonne va chaque post de la galerie VISUALS.
// Seule la cover compte : le nombre de slides n'entre jamais dans le calcul.

// Colonnes de la galerie : 0 = gauche, 1 = centre, 2 = droite
const LEFT = [0]
const CENTER_RIGHT = [1, 2]

// Toutes les hauteurs sont exprimées en « largeurs de tuile », pour que le résultat
// soit le même sur tous les écrans.
// Espace occupé sous l'image : titre + marge
const TEXT_HEIGHT = 0.24

// Garde-fou : écart maximal avec la colonne la plus courte (une image 9:16)
const MAX_GAP = 16 / 9

// Sous ce format, une cover est considérée comme verticale (9:16).
// Au-dessus, c'est un 4:5 ou un 3:4.
const TALL_RATIO = 0.65

const coverRatio = (post) => post.images[0].width / post.images[0].height

const tileHeight = (post) => 1 / coverRatio(post) + TEXT_HEIGHT

const columnHeight = (column) => column.reduce((total, post) => total + tileHeight(post), 0)

// Renvoie, parmi ces colonnes, celle dont la hauteur est la plus petite
const shortestOf = (indexes, heights) =>
  indexes.reduce((best, index) => (heights[index] < heights[best] ? index : best))

// La colonne prévue pour ce post, sauf si elle est déjà trop longue
const chooseColumn = (post, heights) => {
  const preferred = coverRatio(post) < TALL_RATIO ? LEFT : CENTER_RIGHT
  const planned = shortestOf(preferred, heights)
  const shortest = shortestOf([0, 1, 2], heights)
  return heights[planned] - heights[shortest] > MAX_GAP ? shortest : planned
}

// `frozen` = les colonnes déjà validées, sous forme de listes d'identifiants.
// Elles ne sont jamais réorganisées. Un post absent de ces listes est un nouveau post :
// on le pose en haut de sa colonne, du plus ancien au plus récent, pour que le
// résultat soit toujours le même.
export const placePosts = (posts, frozen) => {
  const byId = new Map(posts.map((post) => [post.id, post]))
  const columns = frozen.map((ids) => ids.flatMap((id) => byId.get(id) ?? []))
  const frozenIds = new Set(frozen.flat())
  const newPosts = posts
    .filter((post) => !frozenIds.has(post.id))
    .sort((a, b) => a.date.localeCompare(b.date))

  newPosts.forEach((post) => {
    const column = chooseColumn(post, columns.map(columnHeight))
    columns[column].unshift(post)
  })

  return columns
}
