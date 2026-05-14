const ODDS_API_KEY = import.meta.env.ODDS_API_KEY; // store in .env
const ODDS_BASE = 'https://api.the-odds-api.com/v4';

export interface OddsSport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

export async function fetchAllSports(): Promise<OddsSport[]> {
  if (!ODDS_API_KEY) {
    throw new Error('Missing ODDS_API_KEY environment variable');
  }

  const url = `${ODDS_BASE}/sports/?apiKey=${ODDS_API_KEY}`;
  console.log(`[Odds API] Fetching sports from ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Odds API error (${response.status}): ${errorText}`);
  }

  const data: OddsSport[] = await response.json();
  console.log(`[Odds API] Received ${data.length} sports`);
  return data;
}