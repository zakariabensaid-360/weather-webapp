A lightweight, zero-dependency weather web application built with vanilla JavaScript, HTML5, CSS3, and the Open-Meteo API. The project is designed to be simple, fast, and easy to run locally while focusing on client-side weather lookup.

## Overview

This app lets users search for a city and display:

- today's weather summary
- a 5-day forecast
- weather condition labels and emoji icons
- city-based forecast data from Open-Meteo

It is built as a small client-side app using Vite, with styles handled in CSS and weather logic separated into utility and API modules.

## Features

- Search by city name
- Uses latitude and longitude to fetch forecast data
- Displays current and upcoming weather conditions
- Lightweight, no external UI framework
- Works directly in the browser

## Project structure

```text
weather-webapp/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   ├── GetCity.js
│   │   └── GetWeather.js
│   ���── assets/
│   ├── utilities/
│   │   └── createWeatherCard.js
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
├── LICENSE
└── README.md
```

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Usage of the GetWeather API

The weather logic lives in `src/api/GetWeather.js`.

### Function signature

```js
getWeather(latitude, longitude)
```

### Example

```js
import { getWeather } from './api/GetWeather.js';

const weather = await getWeather(33.5731, -7.5898);
console.log(weather);
```

This sends a request to the Open-Meteo forecast API using the supplied latitude and longitude.

### What it returns

The function returns the JSON response from Open-Meteo, including forecast fields such as:

- `daily.time`
- `daily.temperature_2m_max`
- `daily.weather_code`
- `current.rain`

## Usage of the GetCity API

The city lookup logic lives in `src/api/GetCity.js`.

### Function signature

```js
GetCity(city)
````
### What it returns

The function returns the JSON response from Open-Meteo, including forecast fields such as:

- `city.name`
- `city.latitude`
- `city.longitude`


Example usage:

```js
const data = await getWeather(33.5731, -7.5898);

const day = data.daily.time[0];
const maxTemp = data.daily.temperature_2m_max[0];
const code = data.daily.weather_code[0];

console.log(`Date: ${day}`);
console.log(`Max temperature: ${maxTemp}°C`);
console.log(`Weather code: ${code}`);
```

### API request details

The function builds a URL similar to:

```text
https://api.open-meteo.com/v1/forecast?latitude=33.5731&longitude=-7.5898&daily=weather_code,temperature_2m_max,wind_speed_10m_max&current=rain&forecast_days=6
```

It then calls `fetch()` and:

- waits up to 5 seconds using `AbortSignal.timeout(5000)`
- returns the parsed JSON when the request succeeds
- throws an error if the request fails

### Source

```js
export async function getWeather(x, y) {
  const baseURL = `https://api.open-meteo.com/v1/forecast?latitude=${x}&longitude=${y}&daily=weather_code,temperature_2m_max,wind_speed_10m_max&current=rain&forecast_days=6`;
  const res = await fetch(baseURL, {
    signal: AbortSignal.timeout(5000),
  });

  if (res.status == 200) {
    const data = await res.json();
    return data;
  }

  throw "failed to fetch data";
}
```

## Usage of the GetCity API

The city lookup logic lives in `src/api/GetCity.js`.

### Function signature

```js
GetCity(cityName)
```

### Example

```js
import { GetCity } from './api/GetCity.js';

const city = await GetCity('Casablanca');
console.log(city);
```

This sends a request to the Open-Meteo geocoding API to search for the requested city and then filters the results to cities in Morocco.

### What it returns

The function returns an object with the first matching Moroccan city that is found, containing:

- `name`
- `latitude`
- `longitude`

Example result:

```js
{
  name: 'Casablanca',
  latitude: 33.5731,
  longitude: -7.5898,
}
```

### API request details

The function builds a URL similar to:

```text
https://geocoding-api.open-meteo.com/v1/search?name=Casablanca&count=10&language=en&format=json
```

It then calls `fetch()` and:

- waits up to 5 seconds using `AbortSignal.timeout(5000)`
- parses the JSON response
- checks each result and keeps only entries where `country_code === "MA"`
- returns the first Moroccan match found
- throws an error if no city in Morocco matches the search

### Source

```js
export async function GetCity(city) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`,
    {
      signal: AbortSignal.timeout(5000),
    },
  );

  if (response.ok) {
    const data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].country_code == 'MA') {
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
```

## How the app uses the API

In `src/main.js`, the app:

1. finds a city from a predefined list
2. reads the city's latitude and longitude
3. calls `getWeather(latitude, longitude)`
4. extracts the weather data for the current and upcoming days
5. renders cards for the daily forecast

This keeps the app simple while still providing real weather data from a public API.

## Example cities included

The project currently includes sample city data such as:

- Casablanca
- Rabat
- Marrakech
- Tangier
- Agadir

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Notes

This project is intended as a small frontend practice app and demonstrates how to consume a public weather API in a browser-based JavaScript application without any backend.
