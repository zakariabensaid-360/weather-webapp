export async function GetCity(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
    {
      signal: AbortSignal.timeout(5000),
    },
  );
  if (response.ok) {
    const data = await response.json();
    console.log(data.results[0].country_code);
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].country_code == "MA") {
        return {
          name: data.results[i].name,
          latitude: data.results[i].latitude,
          longitude: data.results[i].longitude,
        };
      }
    }
  }
  throw "The city you are looking dont exists in morroco";
}
