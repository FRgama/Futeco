const BASE_URL = "https://v3.football.api-sports.io";

const headers = {
  "x-rapidapi-key": process.env.API_FOOTBALL_KEY!,
  "x-rapidapi-host": "v3.football.api-sports.io",
};

export async function apiFootball(endpoint: string) {
  console.log("API KEY:", process.env.API_FOOTBALL_KEY);
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function getTeamsByLeague(
  league: number,
  season: number
) {
  const data = await apiFootball(
    `/teams?league=${league}&season=${season}`
  );

  console.log(JSON.stringify(data, null, 2));

  return data.response;
}

