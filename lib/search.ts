/**
 * Search utilities: token normalization and alias expansion.
 */

/**
 * Common aliases mapping user terms to canonical product terms.
 */
const ALIASES: Record<string, string[]> = {
  moisturizer: ["cream", "lotion", "hydrating", "moisturizing", "moisturiser"],
  serum: ["serums", "essence", "concentrate"],
  cleanser: ["cleansers", "wash", "face wash", "facial wash"],
  oil: ["oils", "facial oil", "face oil"],
  mask: ["masks", "masque", "treatment mask"],
  toner: ["toners", "mist", "essence"],
  vitamin: ["vit", "vitamins"],
  "vitamin c": ["vit c", "ascorbic acid", "brightening"],
  retinol: ["vitamin a", "retinoid", "anti-aging", "antiaging"],
  hyaluronic: ["ha", "hyaluronic acid"],
  niacinamide: ["vitamin b3", "niacin"],
  spf: ["sunscreen", "sun protection", "sunblock"],
}

/**
 * Normalize a search query string:
 * - Lowercase
 * - Trim whitespace
 * - Collapse multiple spaces
 */
export function normalizeQuery(query: string): string {
  return query.toLowerCase().trim().replace(/\s+/g, " ")
}

/**
 * Tokenize a query into individual search terms.
 */
export function tokenize(query: string): string[] {
  return normalizeQuery(query)
    .split(" ")
    .filter((t) => t.length > 0)
}

/**
 * Expand a single token using aliases.
 * Returns the canonical term if an alias is found, otherwise the original token.
 */
export function expandAlias(token: string): string {
  const normalized = token.toLowerCase()
  for (const [canonical, aliases] of Object.entries(ALIASES)) {
    if (canonical === normalized || aliases.includes(normalized)) {
      return canonical
    }
  }
  return normalized
}

/**
 * Expand all tokens in a query, returning unique canonical terms.
 */
export function expandQuery(query: string): string[] {
  const tokens = tokenize(query)
  const expanded = tokens.map(expandAlias)
  return [...new Set(expanded)]
}

/**
 * Check if a target string matches any of the search tokens.
 * Uses simple substring matching.
 */
export function matchesAny(target: string, tokens: string[]): boolean {
  const normalizedTarget = target.toLowerCase()
  return tokens.some((token) => normalizedTarget.includes(token))
}

/**
 * Score how well a product matches the search tokens.
 * Higher score = better match.
 */
export function scoreMatch(
  name: string,
  description: string,
  category: string,
  tags: string[],
  tokens: string[]
): number {
  let score = 0
  const lowerName = name.toLowerCase()
  const lowerDesc = description.toLowerCase()
  const lowerCat = category.toLowerCase()
  const lowerTags = tags.map((t) => t.toLowerCase())

  for (const token of tokens) {
    // Name match (highest priority)
    if (lowerName.includes(token)) {
      score += lowerName.startsWith(token) ? 10 : 5
    }
    // Tag match
    if (lowerTags.some((t) => t.includes(token))) {
      score += 4
    }
    // Category match
    if (lowerCat.includes(token)) {
      score += 3
    }
    // Description match
    if (lowerDesc.includes(token)) {
      score += 1
    }
  }

  return score
}
