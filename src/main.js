import { getWeather } from "./api/GetWeather";
import { createWeatherCard } from "./utilities/createWeatherCard";

const cities = [
  { name: "Casablanca", latitude: 33.5731, longitude: -7.5898 },
  { name: "Rabat", latitude: 34.0209, longitude: -6.8416 },
  { name: "Marrakesh", latitude: 31.6295, longitude: -7.9811 },
  { name: "Tangier", latitude: 35.7595, longitude: -5.834 },
  { name: "Agadir", latitude: 30.4278, longitude: -9.5981 },
];

const WEATHER_CODES = {
  0:  { label: "Ciel dégagé",            icon: "☀️" },
  1:  { label: "Plutôt dégagé",          icon: "🌤️" },
  2:  { label: "Partiellement nuageux",  icon: "⛅" },
  3:  { label: "Couvert",                icon: "☁️" },
  45: { label: "Brouillard",             icon: "🌫️" },
  48: { label: "Brouillard givrant",     icon: "🌫️" },
  51: { label: "Bruine légère",          icon: "🌦️" },
  53: { label: "Bruine",                 icon: "🌦️" },
  55: { label: "Bruine forte",           icon: "🌦️" },
  56: { label: "Bruine verglaçante",     icon: "🌧️" },
  57: { label: "Bruine verglaçante",     icon: "🌧️" },
  61: { label: "Pluie légère",           icon: "🌧️" },
  63: { label: "Pluie",                  icon: "🌧️" },
  65: { label: "Pluie forte",            icon: "🌧️" },
  66: { label: "Pluie verglaçante",      icon: "🌧️" },
  67: { label: "Pluie verglaçante",      icon: "🌧️" },
  71: { label: "Neige légère",           icon: "🌨️" },
  73: { label: "Neige",                  icon: "🌨️" },
  75: { label: "Neige forte",            icon: "❄️" },
  77: { label: "Grains de neige",        icon: "🌨️" },
  80: { label: "Averses légères",        icon: "🌦️" },
  81: { label: "Averses",                icon: "🌧️" },
  82: { label: "Averses violentes",      icon: "⛈️" },
  85: { label: "Averses de neige",       icon: "🌨️" },
  86: { label: "Fortes averses de neige", icon: "❄️" },
  95: { label: "Orage",                  icon: "⛈️" },
  96: { label: "Orage avec grêle",       icon: "⛈️" },
  99: { label: "Orage avec forte grêle", icon: "⛈️" },
};


const sub = document.getElementById("sub");
const search = document.getElementById("search");

const today = document.getElementById("today");
const weeklyWeather = document.getElementById("weeklyWeather");
const todayLocation = document.getElementById("today-location");
const todayTempetor = document.getElementById("today-tempetor");
const todayDate = document.getElementById("today-date");
const todayStatus = document.getElementById("today-status");

sub.addEventListener("click", async () => {
  const resultCity = cities.find(
    (city) =>
      city.name.toLocaleLowerCase() === search.value.toLocaleLowerCase(),
  );
  console.log(resultCity);

  if (!resultCity) {
    alert("the city you typed does not exists");
    return;
  }
  try {
    today.textContent = "Loading...";
    let data = await getWeather(resultCity.latitude, resultCity.longitude);
    today.replaceChildren();
    let todayTemp = data.daily.temperature_2m_max[0];
    let todayDat = data.daily.time[0];

    const weatherCard = createWeatherCard({
      location: resultCity.name + `, Morocco`,
      date: todayDat,
      temp: todayTemp + "°C",
      status: WEATHER_CODES[data.daily.weather_code[0]].label,
      weatherCode: WEATHER_CODES[data.daily.weather_code[0]].icon
    });
    today.appendChild(weatherCard);

    for (let i = 1; i < data.daily.temperature_2m_max.length; i++) {
      let dt = data.daily.temperature_2m_max[i];
      let td = data.daily.time[i];
      const weatherCardW = createWeatherCard({
        location: resultCity.name + `, Morocco`,
        date: td,
        temp: dt + "°C",
        status: WEATHER_CODES[data.daily.weather_code[i]].label,
        weatherCode: WEATHER_CODES[data.daily.weather_code[i]].icon
      });

      weeklyWeather.append(weatherCardW);
    }
  } catch (error) {
    alert(error);
  }
});
