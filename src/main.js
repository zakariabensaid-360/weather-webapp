import { GetCity } from "./api/GetCity";
import { getWeather } from "./api/GetWeather";
import { createWeatherCard } from "./utilities/createWeatherCard";
import { createWeatherCardSkeleton } from "./utilities/createWeatherCardSkeleton";
/*
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
*/


const WEATHER_CODES = {
  0: { label: "Ciel dégagé", icon: "fa-solid fa-sun text-amber-500" },
  1: { label: "Plutôt dégagé", icon: "fa-solid fa-cloud-sun text-amber-400" },
  2: { label: "Partiellement nuageux", icon: "fa-solid fa-cloud-sun text-sky-400" },
  3: { label: "Couvert", icon: "fa-solid fa-cloud text-slate-400" },
  45: { label: "Brouillard", icon: "fa-solid fa-smog text-slate-300" },
  48: { label: "Brouillard givrant", icon: "fa-solid fa-smog text-cyan-200" },
  51: { label: "Bruine légère", icon: "fa-solid fa-cloud-rain text-sky-300" },
  53: { label: "Bruine", icon: "fa-solid fa-cloud-rain text-sky-400" },
  55: { label: "Bruine forte", icon: "fa-solid fa-cloud-showers-heavy text-blue-400" },
  56: { label: "Bruine verglaçante", icon: "fa-solid fa-cloud-meatball text-cyan-400" },
  57: { label: "Bruine verglaçante", icon: "fa-solid fa-cloud-meatball text-cyan-500" },
  61: { label: "Pluie légère", icon: "fa-solid fa-cloud-rain text-blue-400" },
  63: { label: "Pluie", icon: "fa-solid fa-cloud-showers-heavy text-blue-500" },
  65: { label: "Pluie forte", icon: "fa-solid fa-cloud-showers-water text-blue-600" },
  66: { label: "Pluie verglaçante", icon: "fa-solid fa-temperature-arrow-down text-teal-400" },
  67: { label: "Pluie verglaçante", icon: "fa-solid fa-temperature-arrow-down text-teal-500" },
  71: { label: "Neige légère", icon: "fa-solid fa-snowflake text-indigo-200" },
  73: { label: "Neige", icon: "fa-solid fa-snowflake text-indigo-300" },
  75: { label: "Neige forte", icon: "fa-solid fa-snowflake text-indigo-400" },
  77: { label: "Grains de neige", icon: "fa-solid fa-snowflake text-blue-200" },
  80: { label: "Averses légères", icon: "fa-solid fa-cloud-sun-rain text-amber-300" },
  81: { label: "Averses", icon: "fa-solid fa-cloud-showers-heavy text-blue-500" },
  82: { label: "Averses violentes", icon: "fa-solid fa-cloud-showers-water text-indigo-600" },
  85: { label: "Averses de neige", icon: "fa-solid fa-snowflake text-indigo-300" },
  86: { label: "Fortes averses de neige", icon: "fa-solid fa-snowflake text-indigo-500" },
  95: { label: "Orage", icon: "fa-solid fa-cloud-bolt text-yellow-500" },
  96: { label: "Orage avec grêle", icon: "fa-solid fa-cloud-bolt text-amber-600" },
  99: { label: "Orage avec forte grêle", icon: "fa-solid fa-cloud-bolt text-orange-600" },
};

const sub = document.getElementById("sub");
const search = document.getElementById("search");

const today = document.getElementById("today");
const weeklyWeather = document.getElementById("weeklyWeather");

sub.addEventListener("click", async () => {
  if (search.value == "") return;
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
    console.log(data)
    today.replaceChildren();
    weeklyWeather.replaceChildren();
    let todayTemp = data.daily.temperature_2m_mean[0];
    let todayDat = data.daily.time[0];
    let todayWind = data.daily.wind_speed_10m_max[0]
    const weatherCard = createWeatherCard({
      location: resultCity.name + `, Morocco`,
      date: todayDat,
      temp: todayTemp + "°C",
      status: WEATHER_CODES[data.daily.weather_code[0]].label,
      weatherCode: WEATHER_CODES[data.daily.weather_code[0]].icon,
      wind: todayWind
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
        wind: data.daily.wind_speed_10m_max[i]
      });

      weeklyWeather.append(weatherCardW);
      sub.disabled = false;
    }
  } catch (error) {
    alert(error);
    sub.disabled = false;
  }
});