const cityInput = document.getElementById("cityInput");
const searchForm = document.getElementById("searchForm");
const locationBtn = document.getElementById("locationBtn");
const countrySelect = document.getElementById("countrySelect");
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
const mascotStage = document.querySelector(".mascot-stage");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

const locationData = {
  Nigeria: {
    Lagos: ["Ikeja", "Lekki", "Victoria Island", "Surulere"],
    Ogun: ["Abeokuta", "Sagamu", "Ijebu-Ode"],
    Abia: ["Aba", "Umuahia", "Ohafia"],
    Rivers: ["Port Harcourt", "Bonny", "Obio/Akpor"]
  },
  Ghana: {
    "Greater Accra": ["Accra", "Tema", "Madina"],
    Ashanti: ["Kumasi", "Obuasi", "Ejisu"],
    Western: ["Sekondi-Takoradi", "Takoradi", "Axim"]
  },
  Kenya: {
    Nairobi: ["Nairobi", "Kibera", "Westlands"],
    Mombasa: ["Mombasa", "Likoni", "Nyali"]
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

function getSelectedLocationQuery() {
  const country = countrySelect.value;
  const state = stateSelect.value;
  const lga = lgaSelect.value;

  if (lga) return `${lga}, ${state}, ${country}`;
  if (state) return `${state}, ${country}`;
  if (country) return country;
  return "";
}

function populateLocationSelectors() {
  const countryEntries = Object.keys(locationData);
  countrySelect.innerHTML = `<option value="">Select country</option>${countryEntries
    .map((country) => `<option value="${country}">${country}</option>`)
    .join("")}`;

  stateSelect.innerHTML = `<option value="">Select state</option>`;
  lgaSelect.innerHTML = `<option value="">Select LGA</option>`;
}

function updateStateOptions() {
  const country = countrySelect.value;
  const states = country ? Object.keys(locationData[country] || {}) : [];

  stateSelect.innerHTML = `<option value="">Select state</option>${states
    .map((state) => `<option value="${state}">${state}</option>`)
    .join("")}`;

  lgaSelect.innerHTML = `<option value="">Select LGA</option>`;
}

function updateLgaOptions() {
  const country = countrySelect.value;
  const state = stateSelect.value;
  const lgas = country && state ? locationData[country][state] || [] : [];

  lgaSelect.innerHTML = `<option value="">Select LGA</option>${lgas
    .map((lga) => `<option value="${lga}">${lga}</option>`)
    .join("")}`;
}

function fillPreferredDefaultSelection() {
  countrySelect.value = "Nigeria";
  updateStateOptions();
  stateSelect.value = "Lagos";
  updateLgaOptions();
  lgaSelect.value = "Ikeja";
  cityInput.value = "Ikeja, Lagos, Nigeria";
}

countrySelect.addEventListener("change", () => {
  updateStateOptions();
  const lookup = getSelectedLocationQuery();
  if (lookup && !cityInput.value.trim()) {
    cityInput.value = lookup;
  }
});

stateSelect.addEventListener("change", () => {
  updateLgaOptions();
  const lookup = getSelectedLocationQuery();
  if (lookup && !cityInput.value.trim()) {
    cityInput.value = lookup;
  }
});

lgaSelect.addEventListener("change", () => {
  const lookup = getSelectedLocationQuery();
  if (lookup) {
    cityInput.value = lookup;
  }
});

async function handleLocationSearch() {
  const directLookup = getSelectedLocationQuery();
  const city = cityInput.value.trim() || directLookup;

  if (!city) {
    showError("Please enter a city name or select a country/state/LGA.");
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

locationBtn.addEventListener("click", async () => {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by this browser.");
    return;
  }

  locationBtn.disabled = true;
  locationBtn.textContent = "Locating...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const label = "Your Location";
        await fetchWeatherByCoordinates(lat, lon, label);
        document.querySelector(".error")?.remove();
      } catch (error) {
        showError("Could not load weather for your location.");
      } finally {
        locationBtn.disabled = false;
        locationBtn.textContent = "Use My Location";
      }
    },
    () => {
      showError("Location permission was denied. Try searching for a city manually.");
      locationBtn.disabled = false;
      locationBtn.textContent = "Use My Location";
    }
  );
});

function setupMascot() {
  if (!mascot || !mascotStage || reducedMotionQuery.matches) {
    return;
  }

  const head = document.getElementById("head-layer");
  const setHeadLook = (x, y) => {
    if (!head) return;
    const angle = Math.max(-12, Math.min(12, x * 1.8));
    head.style.transform = `translate(${x * 0.4}px, ${y * 0.3}px) rotate(${angle}deg)`;
  };

  mascotStage.addEventListener("pointermove", (event) => {
    const rect = mascotStage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setHeadLook(x, y);
  });

  mascotStage.addEventListener("pointerleave", () => {
    if (head) {
      head.style.transform = "translate(0, 0) rotate(0deg)";
    }
  });

  const flyMascot = (event) => {
    const rect = mascotStage.getBoundingClientRect();
    const x = event.clientX ? event.clientX - rect.left : rect.width / 2;
    const y = event.clientY ? event.clientY - rect.top : rect.height / 3;
    const driftX = ((x / rect.width) - 0.5) * 70;
    const driftY = (0.4 - (y / rect.height)) * 32;

    mascot.style.transform = `translate(${driftX}px, ${driftY}px)`;
    mascot.classList.remove("flying");
    void mascot.offsetWidth;
    mascot.classList.add("flying");

    window.setTimeout(() => {
      mascot.style.transform = "translate(0, 0)";
      mascot.classList.remove("flying");
    }, 900);
  };

  mascotStage.addEventListener("click", flyMascot);
  mascotStage.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches && event.touches[0]) {
        flyMascot({ clientX: event.touches[0].clientX, clientY: event.touches[0].clientY });
      }
    },
    { passive: true }
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        mascot.classList.toggle("paused", !entry.isIntersecting);
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(mascotStage);

  document.addEventListener("visibilitychange", () => {
    mascot.classList.toggle("paused", document.hidden);
  });
}

async function initDefaultWeather() {
  try {
    const defaultCity = "London";
    const place = await searchCity(defaultCity);
    await fetchWeatherByCoordinates(place.lat, place.lon, place.label);
  } catch (error) {
    showError("Unable to load default weather.");
  }
}

populateLocationSelectors();
fillPreferredDefaultSelection();
setupMascot();
initDefaultWeather();
