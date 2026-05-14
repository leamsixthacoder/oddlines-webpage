const TSDB_API_KEY = import.meta.env.TSDB_API_KEY || '3'; // free test key
const TSDB_BASE = 'https://www.thesportsdb.com/api/v1/json';

export interface TheSportDBSport {
  idSport: string;
  strSport: string;
  strSportThumb: string;
  strSportIconGreen?: string;
  strSportDescription?: string;
}

export async function fetchAllSportsImages(): Promise<TheSportDBSport[]> {
  const url = `${TSDB_BASE}/${TSDB_API_KEY}/all_sports.php`;
  console.log(`[TheSportsDB] Fetching sports from ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TheSportsDB error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  if (!json.sports) {
    throw new Error('TheSportsDB response missing "sports" array');
  }
  console.log(`[TheSportsDB] Received ${json.sports.length} sports`);
  return json.sports as TheSportDBSport[];
}