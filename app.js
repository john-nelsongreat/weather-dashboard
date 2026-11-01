const cityInput = document.getElementById("cityInput");
const searchForm = document.getElementById("searchForm");
const stateSelect = document.getElementById("stateSelect");
const lgaSelect = document.getElementById("lgaSelect");
const rainOverlay = document.getElementById("weatherRain");

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

const rainyCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);

const nigeriaStateLgas = {
  Abia: ["Aba", "Umuahia", "Ohafia"],
  Adamawa: ["Yola", "Mubi", "Jimeta"],
  AkwaIbom: ["Uyo", "Eket", "Ikot Ekpene"],
  Anambra: ["Awka", "Onitsha", "Nnewi"],
  Bauchi: ["Bauchi", "Azare", "Misau"],
  Bayelsa: ["Yenagoa", "Brass", "Ogbia"],
  Benue: ["Makurdi", "Otukpo", "Gboko"],
  Borno: ["Maiduguri", "Biu", "Kano"],
  CrossRiver: ["Calabar", "Ugep", "Ikom"],
  Delta: ["Asaba", "Warri", "Sapele"],
  Ebonyi: ["Abakaliki", "Afikpo", "Onueke"],
  Edo: ["Benin City", "Auchi", "Ekpoma"],
  Ekiti: ["Ado Ekiti", "Ikere", "Ijero"],
  Enugu: ["Enugu", "Nsukka", "Agbani"],
  FCT: ["Garki", "Wuse", "Maitama"],
  Gombe: ["Gombe", "Kumo", "Billiri"],
  Imo: ["Owerri", "Orlu", "Okigwe"],
  Jigawa: ["Dutse", "Hadejia", "Birnin Kudu"],
  Kaduna: ["Kaduna", "Zaria", "Kafanchan"],
  Kano: ["Kano", "Gwale", "Nassarawa"],
  Katsina: ["Katsina", "Kankia", "Daura"],
  Kebbi: ["Birnin Kebbi", "Argungu", "Yelwa"],
  Kogi: ["Lokoja", "Idah", "Okene"],
  Kwara: ["Ilorin", "Offa", "Jebba"],
  Lagos: ["Ikeja", "Lekki", "Victoria Island", "Surulere", "Yaba"],
  Nasarawa: ["Lafia", "Keffi", "Karu"],
  Niger: ["Minna", "Bida", "Kontagora"],
  Ogun: ["Abeokuta", "Sagamu", "Ijebu Ode"],
  Ondo: ["Akure", "Owo", "Ondo City"],
  Osun: ["Osogbo", "Ilesa", "Ikire"],
  Oyo: ["Ibadan", "Ogbomoso", "Iseyin"],
  Plateau: ["Jos", "Barkin Ladi", "Pankshin"],
  Rivers: ["Port Harcourt", "Bonny", "Obio Akpor"],
  Sokoto: ["Sokoto", "Tambuwal", "Gwadabawa"],
  Taraba: ["Jalingo", "Wukari", "Serti"],
  Yobe: ["Damaturu", "Potiskum", "Gujba"],
  Zamfara: ["Gusau", "Kaura Namoda", "Talata Mafara"]
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

  applyWeatherEffects(current.weather_code);
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

function buildRainOverlay() {
  if (!rainOverlay) return;
  rainOverlay.innerHTML = "";

  const dropCount = 80;
  for (let i = 0; i < dropCount; i += 1) {
    const drop = document.createElement("span");
    drop.className = "drop";
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDelay = `${(Math.random() * 1.2).toFixed(2)}s`;
    drop.style.animationDuration = `${(0.8 + Math.random() * 1.2).toFixed(2)}s`;
    drop.style.opacity = (0.25 + Math.random() * 0.7).toFixed(2);
    rainOverlay.appendChild(drop);
  }
}

function applyWeatherEffects(weatherCode) {
  if (!rainOverlay) return;
  const isRainy = rainyCodes.has(Number(weatherCode));
  rainOverlay.classList.toggle("active", isRainy);
  if (!isRainy && rainOverlay.innerHTML.trim() === "") {
    buildRainOverlay();
  }
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

function populateStates() {
  const states = Object.keys(nigeriaStateLgas);
  stateSelect.innerHTML = `<option value="">Select state</option>${states
    .map((state) => `<option value="${state}">${state}</option>`)
    .join("")}`;
  lgaSelect.innerHTML = `<option value="">Select LGA</option>`;
}

function updateLocalGovAreas() {
  const selectedState = stateSelect.value;
  const localGovs = selectedState ? nigeriaStateLgas[selectedState] || [] : [];

  lgaSelect.innerHTML = `<option value="">Select LGA</option>${localGovs
    .map((lga) => `<option value="${lga}">${lga}</option>`)
    .join("")}`;
}

async function applySelectedLocation() {
  const state = stateSelect.value;
  const lga = lgaSelect.value;
  if (!state || !lga) return;

  const locationNameText = `${lga}, ${state}, Nigeria`;
  cityInput.value = locationNameText;

  try {
    const result = await searchCity(locationNameText);
    await fetchWeatherByCoordinates(result.lat, result.lon, result.label);
    document.querySelector(".error")?.remove();
  } catch (error) {
    showError(error.message || "Unable to fetch weather.");
  }
}

stateSelect.addEventListener("change", () => {
  updateLocalGovAreas();
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

async function initDefaultWeather() {
  const defaultState = "Lagos";
  const defaultLga = "Ikeja";
  stateSelect.value = defaultState;
  updateLocalGovAreas();
  lgaSelect.value = defaultLga;
  const defaultQuery = `${defaultLga}, ${defaultState}, Nigeria`;
  cityInput.value = defaultQuery;

  try {
    const place = await searchCity(defaultQuery);
    await fetchWeatherByCoordinates(place.lat, place.lon, place.label);
  } catch (error) {
    showError("Unable to load default weather.");
  }
}

buildRainOverlay();
populateStates();
initDefaultWeather();
