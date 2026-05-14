import type { APIRoute } from 'astro';
import { getEnrichedSports } from '../../lib/sportsService';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get('refresh') === '1';

    const sports = await getEnrichedSports(forceRefresh);
    return new Response(JSON.stringify(sports), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[API /sports] Error:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch sports data' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};