const cityInput = document.getElementById("cityInput");
const searchForm = document.getElementById("searchForm");
const locationBtn = document.getElementById("locationBtn");
const stateSelect = document.getElementById("stateSelect");
const lgaSelect = document.getElementById("lgaSelect");

const locationName = document.getElementById("locationName");
const currentDate = document.getElementById("currentDate");
const weatherIcon = document.getElementById("weatherIcon");
const currentTemp = document.getElementById("currentTemp");
const conditionText = document.getElementById("conditionText");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const clouds = document.getElementById("clouds");
const forecastList = document.getElementById("forecastList");
const hourlyList = document.getElementById("hourlyList");
const mascot = document.getElementById("mascot");

const weatherCodeMap = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mostly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Cloudy", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Depositing rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Moderate drizzle", icon: "🌦️" },
  55: { label: "Dense drizzle", icon: "🌧️" },
  56: { label: "Light freezing drizzle", icon: "🌧️" },
  57: { label: "Dense freezing drizzle", icon: "🌧️" },
  61: { label: "Slight rain", icon: "🌦️" },
  63: { label: "Moderate rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  66: { label: "Light freezing rain", icon: "🌧️" },
  67: { label: "Heavy freezing rain", icon: "🌧️" },
  71: { label: "Slight snow", icon: "🌨️" },
  73: { label: "Moderate snow", icon: "❄️" },
  75: { label: "Heavy snow", icon: "❄️" },
  77: { label: "Snow grains", icon: "❄️" },
  80: { label: "Rain showers", icon: "🌦️" },
  81: { label: "Heavy rain showers", icon: "🌧️" },
  82: { label: "Violent rain showers", icon: "⛈️" },
  85: { label: "Snow showers", icon: "🌨️" },
  86: { label: "Heavy snow showers", icon: "❄️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Thunderstorm with hail", icon: "⛈️" },
  99: { label: "Severe thunderstorm", icon: "⛈️" }
};

const nigeriaLocations = {
  Lagos: {
    Ikeja: { lat: 6.6018, lon: 3.3515 },
    Lekki: { lat: 6.4541, lon: 3.4705 },
    "Victoria Island": { lat: 6.4281, lon: 3.4219 },
    Surulere: { lat: 6.5024, lon: 3.3649 }
  },
  Ogun: {
    Abeokuta: { lat: 7.1509, lon: 3.3485 },
    Sagamu: { lat: 6.835, lon: 3.632 },
    "Ijebu-Ode": { lat: 6.826, lon: 3.917 }
  },
  Abuja: {
    Gwarinpa: { lat: 9.118, lon: 7.404 },
    Maitama: { lat: 9.095, lon: 7.483 },
    Wuse: { lat: 9.076, lon: 7.486 }
  },
  Rivers: {
    "Port Harcourt": { lat: 4.8156, lon: 7.0498 },
    Bonny: { lat: 4.442, lon: 7.176 },
    "Obio/Akpor": { lat: 4.907, lon: 7.054 }
  },
  Kano: {
    Kano: { lat: 12.0022, lon: 8.592 },
    Nassarawa: { lat: 12.081, lon: 8.517 },
    Fagge: { lat: 12.008, lon: 8.519 }
  },
  Enugu: {
    Enugu: { lat: 6.5244, lon: 7.4954 },
    Nsukka: { lat: 6.856, lon: 7.392 },
    Oji: { lat: 6.454, lon: 7.211 }
  }
};

function formatDay(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

function formatTime(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(date);
}

function getWeatherDetails(code) {
  return weatherCodeMap[code] || { label: "Unknown", icon: "❔" };
}

function renderCurrentWeather(data) {
  const current = data.current;
  const weather = getWeatherDetails(current.weather_code);

  locationName.textContent = data.locationName || "Weather";
  currentDate.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  weatherIcon.textContent = weather.icon;
  currentTemp.textContent = `${Math.round(current.temperature_2m)}°`;
  conditionText.textContent = weather.label;
  feelsLike.textContent = `Feels like ${Math.round(current.apparent_temperature)}°`;

  humidity.textContent = `${Math.round(current.relative_humidity_2m)}%`;
  wind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  pressure.textContent = `${Math.round(current.surface_pressure)} hPa`;
  clouds.textContent = `${Math.round(current.cloud_cover)}%`;
}

function renderForecast(data) {
  const { daily } = data;
  forecastList.innerHTML = "";

  daily.time.forEach((date, index) => {
    const code = daily.weather_code[index];
    const weather = getWeatherDetails(code);

    const item = document.createElement("div");
    item.className = "forecast-item";

    item.innerHTML = `
      <div class="day">${formatDay(date)}</div>
      <div class="icon">${weather.icon}</div>
      <div class="condition">${weather.label}</div>
      <div class="temp-range">${Math.round(daily.temperature_2m_min[index])}° / ${Math.round(daily.temperature_2m_max[index])}°</div>
    `;

    forecastList.appendChild(item);
  });
}

function renderHourly(data) {
  const hours = data.hourly;
  const nextHours = hours.time.slice(0, 8);
  hourlyList.innerHTML = "";

  nextHours.forEach((time, index) => {
    const code = hours.weather_code[index];
    const weather = getWeatherDetails(code);

    const card = document.createElement("div");
    card.className = "hour-card";

    card.innerHTML = `
      <div class="hour">${formatTime(time)}</div>
      <div class="icon">${weather.icon}</div>
      <div class="temp">${Math.round(hours.temperature_2m[index])}°</div>
    `;

    hourlyList.appendChild(card);
  });
}

function showError(message) {
  const existingError = document.querySelector(".error");
  if (existingError) {
    existingError.remove();
  }

  const errorNode = document.createElement("div");
  errorNode.className = "error";
  errorNode.textContent = message;
  document.getElementById("appContent").prepend(errorNode);
}

async function fetchWeatherByCoordinates(lat, lon, label) {
  const url =
    "https://api.open-meteo.com/v1/forecast?" +
    new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,cloud_cover",
      hourly: "temperature_2m,weather_code",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
      timezone: "auto",
      forecast_days: 7
    }).toString();

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Weather data request failed.");
  }

  const data = await response.json();
  data.locationName = label;

  renderCurrentWeather(data);
  renderForecast(data);
  renderHourly(data);
}

async function searchCity(city) {
  const geocodeUrl =
    "https://geocoding-api.open-meteo.com/v1/search?" +
    new URLSearchParams({
      name: city,
      count: 1,
      language: "en",
      format: "json"
    }).toString();

  const response = await fetch(geocodeUrl);
  if (!response.ok) {
    throw new Error("City lookup failed.");
  }

  const result = await response.json();

  if (!result.results || result.results.length === 0) {
    throw new Error(`No matching city found for "${city}".`);
  }

  const place = result.results[0];
  return {
    lat: place.latitude,
    lon: place.longitude,
    label: `${place.name}${place.country ? ", " + place.country : ""}`
  };
}

function populateStateOptions() {
  const states = Object.keys(nigeriaLocations);
  stateSelect.innerHTML = `<option value="">Select state</option>${states
    .map((state) => `<option value="${state}">${state}</option>`)
    .join("")}`;
  lgaSelect.innerHTML = `<option value="">Select LGA</option>`;
}

function updateLgaOptions() {
  const state = stateSelect.value;
  const lgas = state ? Object.keys(nigeriaLocations[state] || {}) : [];

  lgaSelect.innerHTML = `<option value="">Select LGA</option>${lgas
    .map((lga) => `<option value="${lga}">${lga}</option>`)
    .join("")}`;
}

function applySelectedLocation() {
  const state = stateSelect.value;
  const lga = lgaSelect.value;
  if (!state || !lga) return;

  const location = nigeriaLocations[state]?.[lga];
  if (!location) return;

  cityInput.value = `${lga}, ${state}, Nigeria`;
  fetchWeatherByCoordinates(location.lat, location.lon, `${lga}, ${state}, Nigeria`).catch(() => {
    showError("Unable to load weather for the selected location.");
  });
}

stateSelect.addEventListener("change", () => {
  updateLgaOptions();
  if (stateSelect.value && !lgaSelect.value) {
    cityInput.value = `${stateSelect.value}, Nigeria`;
  }
});

lgaSelect.addEventListener("change", () => {
  applySelectedLocation();
});

async function handleLocationSearch() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name or choose a state and LGA.");
    return;
  }

  try {
    const place = await searchCity(city);
    await fetchWeatherByCoordinates(place.lat, place.lon, place.label);
    document.querySelector(".error")?.remove();
  } catch (error) {
    showError(error.message || "Unable to fetch weather.");
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleLocationSearch();
});

function setupMascot() {
  if (!mascot) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  mascot.addEventListener("click", () => {
    mascot.classList.remove("flying");
    void mascot.offsetWidth;
    mascot.classList.add("flying");

    const pos = mascot.style.transform || "";
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = -Math.random() * 70 - 25;
    mascot.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${(Math.random() - 0.5) * 24}deg)`;

    window.setTimeout(() => {
      mascot.style.transform = pos || "translate(0, 0)";
      mascot.classList.remove("flying");
    }, 1400);
  });

  const stage = mascot.closest(".mascot-stage");
  if (!stage) return;

  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const tilt = (x - 0.5) * 18;
    mascot.style.transform = `rotate(${tilt}deg)`;
  });

  stage.addEventListener("pointerleave", () => {
    mascot.style.transform = "rotate(0deg)";
  });
}

async function initDefaultWeather() {
  const defaultState = "Lagos";
  const defaultLga = "Ikeja";
  const place = nigeriaLocations[defaultState][defaultLga];

  stateSelect.value = defaultState;
  updateLgaOptions();
  lgaSelect.value = defaultLga;
  cityInput.value = `${defaultLga}, ${defaultState}, Nigeria`;

  try {
    await fetchWeatherByCoordinates(place.lat, place.lon, `${defaultLga}, ${defaultState}, Nigeria`);
  } catch (error) {
    showError("Unable to load default weather.");
  }
}

populateStateOptions();
setupMascot();
initDefaultWeather();
