// Static image map for sports based on The Odds API 'group' field.
// Images are free-to-use SVGs from a public CDN (e.g., Iconify or a custom set).
// This map covers the most common sports; fallback to null if missing.

export const STATIC_IMAGE_MAP: Record<string, string> = {
 // ── American Football ──────────────────────────────────────
  'americanfootball_nfl': '/images/leagues/nfl.png',
  "americanfootball_ncaaf": '/images/icons/american-football.png', // NCAA football (generic icon)
  // ── Basketball ─────────────────────────────────────────────
  'basketball_nba': '/images/leagues/nba.png',
  'basketball_wnba': '/images/leagues/wnba.png',

  // ── Soccer ─────────────────────────────────────────────────
  'soccer_spain_la_liga': '/images/leagues/laliga.png',
  'soccer_uefa_champs_league': '/images/leagues/uefa.png',
  // ── Baseball ───────────────────────────────────────────────
  'baseball_mlb': '/images/leagues/mlb.png',
  // ── Ice Hockey ─────────────────────────────────────────────
  'icehockey_nhl': '/images/leagues/nhl.png',

  // ── MMA / Boxing ───────────────────────────────────────────
  'mma_mixed_martial_arts': '/images/leagues/ufc.png',          // UFC is the main MMA league
  'boxing_boxing': '/images/icons/boxing.png',

  // ── Tennis ─────────────────────────────────────────────────
  'tennis_atp_italian_open': '/images/icons/tennis.png',

  // ── Rugby League / Union ───────────────────────────────────
  'rugbyleague_nrl': '/images/icons/rugby-football.png',
 // Add more as needed – find icons at https://icon-sets.iconify.design/?query=sport
};