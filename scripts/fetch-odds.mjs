// ============================================================
// ODDLINES — odds fetch job
// Runs on a schedule via .github/workflows/fetch-odds.yml (no server,
// no exposed API key). Pulls pre-match odds from The Odds API
// (https://the-odds-api.com), reshapes them into the same catalogue
// shape the front-end already expects (see js/od-data.js OD.sports),
// and writes the result to data/odds.json for the static site to fetch.
//
// Design choices, and why:
//  - Only *upcoming* fixtures are kept. We refresh a couple of times a
//    day, so there is no way to honestly show a live score/minute — a
//    stale "LIVE 67'" badge would be actively misleading. Once a game's
//    kickoff time passes, it drops out of the feed on the next run.
//  - Team crest color/initials are derived locally (deterministic hash),
//    not fetched — the provider does not supply logos, and the site's
//    existing colored-initial badge already covers this with no
//    licensing/trademark exposure from hosting official club marks.
//  - "trend" arrows are computed by diffing against the previous
//    data/odds.json, so the UI's up/down indicators stay meaningful.
//  - League keys are resolved against the live /v4/sports list before
//    fetching, rather than hardcoded blindly — a league that goes
//    inactive or gets renamed is skipped (and logged) instead of
//    silently 404ing forever in a background cron job.
// ============================================================

const API_KEY = process.env.ODDS_API_KEY;
const BASE = 'https://api.the-odds-api.com/v4';
const OUT_FILE = new URL('../data/odds.json', import.meta.url);
const REGION = 'eu'; // single region keeps credit cost to ~1 per league per run
const MAX_EVENTS_PER_LEAGUE = 8;

// North America + Latin America + Europe, matching the original mock catalogue.
// Tennis is intentionally omitted for now: the-odds-api exposes tennis as
// per-tournament keys (e.g. tennis_atp_wimbledon) rather than a standing
// "ATP tour" key, so a hardcoded key would silently go stale between
// tournaments. Add it back once we pin down a reliable resolution strategy.
const LEAGUES = [
  { apiSport: 'soccer_epl',              uiSport: 'soccer',     icon: 'soccer',     leagueKey: 'epl',    leagueName: 'Premier League', region: 'EN' },
  { apiSport: 'soccer_spain_la_liga',    uiSport: 'soccer',     icon: 'soccer',     leagueKey: 'laliga', leagueName: 'LaLiga',          region: 'ES' },
  { apiSport: 'soccer_mexico_ligamx',    uiSport: 'soccer',     icon: 'soccer',     leagueKey: 'ligamx', leagueName: 'Liga MX',         region: 'MX' },
  { apiSport: 'basketball_nba',          uiSport: 'basketball', icon: 'basketball', leagueKey: 'nba',    leagueName: 'NBA',             region: 'US' },
  { apiSport: 'americanfootball_nfl',    uiSport: 'football',   icon: 'football',   leagueKey: 'nfl',    leagueName: 'NFL',             region: 'US' },
  { apiSport: 'baseball_mlb',            uiSport: 'baseball',   icon: 'baseball',   leagueKey: 'mlb',    leagueName: 'MLB',             region: 'US' },
  { apiSport: 'mma_mixed_martial_arts',  uiSport: 'mma',        icon: 'mma',        leagueKey: 'ufc',    leagueName: 'MMA',             region: 'INT' },
];

if (!API_KEY) {
  console.error('ODDS_API_KEY is not set (add it as a repo secret). Aborting without touching data/odds.json.');
  process.exit(1);
}

function hashHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % 360;
}
function colorFor(name) {
  return `hsl(${hashHue(name)},55%,38%)`;
}
function abbrFor(name) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return words.map(w => w[0]).join('').slice(0, 3).toUpperCase();
  return name.slice(0, 3).toUpperCase();
}

async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`${res.status} ${res.statusText} for ${url.split('?')[0]} — ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function loadPreviousPrices() {
  try {
    const fs = await import('node:fs/promises');
    const raw = await fs.readFile(OUT_FILE, 'utf8');
    const prev = JSON.parse(raw);
    const map = new Map();
    for (const sport of prev.sports || []) {
      for (const league of sport.leagues || []) {
        for (const ev of league.events || []) {
          const m = ev.markets && ev.markets.moneyline;
          if (!m) continue;
          map.set(ev.id + '-1', m[0]);
          map.set(ev.id + '-x', m[1]);
          map.set(ev.id + '-2', m[2]);
        }
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

function bestPrices(event) {
  let home = 0, draw = 0, away = 0;
  for (const bk of event.bookmakers || []) {
    const mkt = (bk.markets || []).find(m => m.key === 'h2h');
    if (!mkt) continue;
    for (const o of mkt.outcomes || []) {
      if (o.name === event.home_team) home = Math.max(home, o.price);
      else if (o.name === event.away_team) away = Math.max(away, o.price);
      else if (o.name.toLowerCase() === 'draw') draw = Math.max(draw, o.price);
    }
  }
  return [home, draw, away];
}

function trendOf(prevMap, id, key, current) {
  const prev = prevMap.get(id + '-' + key);
  if (!prev || !current) return '';
  if (current > prev) return '+';
  if (current < prev) return '-';
  return '';
}

async function run() {
  const activeList = await getJSON(`${BASE}/sports/?apiKey=${API_KEY}`);
  const activeKeys = new Set(activeList.filter(s => s.active).map(s => s.key));

  const toFetch = LEAGUES.filter(l => activeKeys.has(l.apiSport));
  const skipped = LEAGUES.filter(l => !activeKeys.has(l.apiSport));
  if (skipped.length) {
    console.warn('Skipping leagues not currently active on The Odds API:', skipped.map(l => l.apiSport).join(', '));
  }

  const prevMap = await loadPreviousPrices();
  const now = Date.now();
  const bySport = new Map();
  let firstEventPerSport = new Set();

  for (const league of toFetch) {
    let events;
    try {
      events = await getJSON(
        `${BASE}/sports/${league.apiSport}/odds/?apiKey=${API_KEY}&regions=${REGION}&markets=h2h&oddsFormat=decimal&dateFormat=iso`
      );
    } catch (err) {
      console.error(`Failed to fetch ${league.apiSport}:`, err.message);
      continue;
    }

    const upcoming = events
      .filter(e => new Date(e.commence_time).getTime() > now)
      .sort((a, b) => new Date(a.commence_time) - new Date(b.commence_time))
      .slice(0, MAX_EVENTS_PER_LEAGUE);

    const mappedEvents = upcoming.map(e => {
      const [h, d, a] = bestPrices(e);
      const homeName = e.home_team, awayName = e.away_team;
      const big = !firstEventPerSport.has(league.uiSport);
      if (big) firstEventPerSport.add(league.uiSport);
      return {
        id: e.id,
        league: league.leagueName,
        region: league.region,
        home: { name: homeName, abbr: abbrFor(homeName), color: colorFor(homeName) },
        away: { name: awayName, abbr: abbrFor(awayName), color: colorFor(awayName) },
        start: e.commence_time,
        live: false,
        minute: null,
        score: null,
        markets: { moneyline: [h, d, a] },
        trend: [
          trendOf(prevMap, e.id, '1', h),
          trendOf(prevMap, e.id, 'x', d),
          trendOf(prevMap, e.id, '2', a),
        ],
        big,
      };
    }).filter(e => e.markets.moneyline[0] > 0 || e.markets.moneyline[2] > 0); // drop events with no priced market yet

    if (!bySport.has(league.uiSport)) {
      bySport.set(league.uiSport, { key: league.uiSport, icon: league.icon, leagues: [] });
    }
    bySport.get(league.uiSport).leagues.push({ key: league.leagueKey, name: league.leagueName, region: league.region, events: mappedEvents });

    console.log(`${league.apiSport}: ${mappedEvents.length} upcoming events`);
  }

  const sports = Array.from(bySport.values()).filter(s => s.leagues.some(l => l.events.length));

  if (!sports.length) {
    console.error('No sports data fetched successfully — leaving existing data/odds.json untouched.');
    process.exit(1);
  }

  const out = { generatedAt: new Date().toISOString(), sports };
  const fs = await import('node:fs/promises');
  await fs.mkdir(new URL('../data/', import.meta.url), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote data/odds.json with ${sports.length} sports.`);
}

run().catch(err => {
  console.error('Fetch job failed:', err);
  process.exit(1);
});
