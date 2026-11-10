import { GetCity } from "./api/GetCity";
import { getWeather } from "./api/GetWeather";
import { createWeatherCard } from "./utilities/createWeatherCard";
import { createWeatherCardSkeleton } from "./utilities/createWeatherCardSkeleton";

const WEATHER_CODES = {
  0: { label: "Ciel dégagé", icon: "☀️" },
  1: { label: "Plutôt dégagé", icon: "🌤️" },
  2: { label: "Partiellement nuageux", icon: "⛅" },
  3: { label: "Couvert", icon: "☁️" },
  45: { label: "Brouillard", icon: "🌫️" },
  48: { label: "Brouillard givrant", icon: "🌫️" },
  51: { label: "Bruine légère", icon: "🌦️" },
  53: { label: "Bruine", icon: "🌦️" },
  55: { label: "Bruine forte", icon: "🌦️" },
  56: { label: "Bruine verglaçante", icon: "🌧️" },
  57: { label: "Bruine verglaçante", icon: "🌧️" },
  61: { label: "Pluie légère", icon: "🌧️" },
  63: { label: "Pluie", icon: "🌧️" },
  65: { label: "Pluie forte", icon: "🌧️" },
  66: { label: "Pluie verglaçante", icon: "🌧️" },
  67: { label: "Pluie verglaçante", icon: "🌧️" },
  71: { label: "Neige légère", icon: "🌨️" },
  73: { label: "Neige", icon: "🌨️" },
  75: { label: "Neige forte", icon: "❄️" },
  77: { label: "Grains de neige", icon: "🌨️" },
  80: { label: "Averses légères", icon: "🌦️" },
  81: { label: "Averses", icon: "🌧️" },
  82: { label: "Averses violentes", icon: "⛈️" },
  85: { label: "Averses de neige", icon: "🌨️" },
  86: { label: "Fortes averses de neige", icon: "❄️" },
  95: { label: "Orage", icon: "⛈️" },
  96: { label: "Orage avec grêle", icon: "⛈️" },
  99: { label: "Orage avec forte grêle", icon: "⛈️" },
};

const sub = document.getElementById("sub");
const search = document.getElementById("search");

const today = document.getElementById("today");
const weeklyWeather = document.getElementById("weeklyWeather");

sub.addEventListener("click", async () => {
  try {
    today.replaceChildren();
    weeklyWeather.replaceChildren();
    sub.disabled = true;
    const resultCity = await GetCity(search.value.toLocaleLowerCase());
    console.log(resultCity);
    today.append(createWeatherCardSkeleton());
    for (let i = 0; i < 5; i++) {
      weeklyWeather.append(createWeatherCardSkeleton());
    }
    let data = await getWeather(resultCity.latitude, resultCity.longitude);
    today.replaceChildren();
    weeklyWeather.replaceChildren();
    let todayTemp = data.daily.temperature_2m_mean[0];
    let todayDat = data.daily.time[0];

    const weatherCard = createWeatherCard({
      location: resultCity.name + `, Morocco`,
      date: todayDat,
      temp: todayTemp + "°C",
      status: WEATHER_CODES[data.daily.weather_code[0]].label,
      weatherCode: WEATHER_CODES[data.daily.weather_code[0]].icon,
    });
    today.appendChild(weatherCard);

    for (let i = 1; i < data.daily.temperature_2m_mean.length; i++) {
      let dt = data.daily.temperature_2m_mean[i];
      let td = data.daily.time[i];
      const weatherCardW = createWeatherCard({
        location: resultCity.name + `, Morocco`,
        date: td,
        temp: dt + "°C",
        status: WEATHER_CODES[data.daily.weather_code[i]].label,
        weatherCode: WEATHER_CODES[data.daily.weather_code[i]].icon,
      });

      weeklyWeather.append(weatherCardW);
      sub.disabled = false;
    }
  } catch (error) {
    alert(error);
    sub.disabled = false;
  }
});
