export async function getWeather(x, y) {
  const baseURL = `https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&daily=weather_code,temperature_2m_max,wind_speed_10m_max&current=rain&forecast_days=6`;
  const res = await fetch(baseURL, {
    signal: AbortSignal.timeout(5000),
  });
  if (res.status == 200) {
    const data = await res.json();
    return data;
  }
  throw "failed to fetch data"
}

