import { getWeather } from "./api/GetWeather";
import { createWeatherCard } from "./utilities/createWeatherCard";

const cities = [
  { name: "Casablanca", latitude: 33.5992, longitude: -7.6200 },
  { name: "Rabat", latitude: 34.0211, longitude: -6.8414 },
  { name: "Marrakesh", latitude: 31.6295, longitude: -7.9811 },
  { name: "Tangier", latitude: 35.7767, longitude: -5.8039 },
  { name: "Agadir", latitude: 30.4214, longitude: -9.5831 },
  { name: "Fez", latitude: 34.0433, longitude: -5.0033 },
  { name: "Meknes", latitude: 33.8833, longitude: -5.5500 },
  { name: "Oujda", latitude: 34.6867, longitude: -1.9114 },
  { name: "Kenitra", latitude: 34.2500, longitude: -6.5833 },
  { name: "Tetouan", latitude: 35.5667, longitude: -5.3667 },
  { name: "Safi", latitude: 32.2833, longitude: -9.2333 },
  { name: "Nador", latitude: 35.1667, longitude: -2.9333 },
  { name: "Beni Mellal", latitude: 32.3394, longitude: -6.3608 },
  { name: "Taza", latitude: 34.2144, longitude: -4.0088 },
  { name: "Mohammedia", latitude: 33.6833, longitude: -7.3833 },
  { name: "Khouribga", latitude: 32.8800, longitude: -6.9000 },
  { name: "El Jadida", latitude: 33.2566, longitude: -8.5025 },
  { name: "Berkane", latitude: 34.9167, longitude: -2.3167 },
  { name: "Taourirt", latitude: 34.4100, longitude: -2.8900 },
  { name: "Al Hoceima", latitude: 35.2451, longitude: -3.9302 }
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
