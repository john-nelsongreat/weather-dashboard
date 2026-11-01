const cityInput = document.getElementById("cityInput");
const searchForm = document.getElementById("searchForm");
const stateSelect = document.getElementById("stateSelect");
const lgaSelect = document.getElementById("lgaSelect");
const rainOverlay = document.getElementById("weatherRain");
const locationChip = document.getElementById("locationChip");

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
  Abia: [
    "Aba North",
    "Aba South",
    "Arochukwu",
    "Bende",
    "Ikwuano",
    "Isiala Ngwa North",
    "Isiala Ngwa South",
    "Isuikwuato",
    "Obi Ngwa",
    "Ohafia",
    "Osisioma",
    "Ugwunagbo",
    "Ukwa East",
    "Ukwa West",
    "Umuahia North",
    "Umuahia South",
    "Umunneochi"
  ],
  Adamawa: [
    "Demsa",
    "Fufore",
    "Ganye",
    "Girei",
    "Gombi",
    "Guyuk",
    "Hong",
    "Jada",
    "Lamurde",
    "Madagali",
    "Maiha",
    "Mayo-Belwa",
    "Michika",
    "Mubi North",
    "Mubi South",
    "Numan",
    "Shelleng",
    "Song",
    "Toungo",
    "Yola North",
    "Yola South"
  ],
  "Akwa Ibom": [
    "Abak",
    "Eastern Obolo",
    "Eket",
    "Esit Eket",
    "Essien Udim",
    "Etim Ekpo",
    "Etinan",
    "Ibeno",
    "Ibesikpo Asutan",
    "Ibiono Ibom",
    "Ika",
    "Ikono",
    "Ikot Abasi",
    "Ikot Ekpene",
    "Itu",
    "Mbo",
    "Mkpat Enin",
    "Nsit Atai",
    "Nsit Ibom",
    "Nsit Ubium",
    "Obot Akara",
    "Okobo",
    "Onna",
    "Oron",
    "Oruk Anam",
    "Udung Uko",
    "Ukanafun",
    "Uruan",
    "Urue-Offong/Oruko",
    "Uyo"
  ],
  Anambra: [
    "Aguata",
    "Anambra East",
    "Anambra West",
    "Anaocha",
    "Awka North",
    "Awka South",
    "Ayamelum",
    "Dunukofia",
    "Ekwusigo",
    "Idemili North",
    "Idemili South",
    "Ihiala",
    "Njikoka",
    "Nnewi North",
    "Nnewi South",
    "Ogbaru",
    "Onitsha North",
    "Onitsha South",
    "Orumba North",
    "Orumba South",
    "Oyi"
  ],
  Bauchi: [
    "Alkaleri",
    "Bauchi",
    "Bogoro",
    "Dambam",
    "Darazo",
    "Dass",
    "Gamawa",
    "Ganjuwa",
    "Giade",
    "Katagum",
    "Kirfi",
    "Misau",
    "Ningi",
    "Shira",
    "Tafawa Balewa",
    "Toro",
    "Warji",
    "Zaki"
  ],
  Bayelsa: [
    "Brass",
    "Ekeremor",
    "Kolokuma/Opokuma",
    "Nembe",
    "Ogbia",
    "Sagbama",
    "Southern Ijaw",
    "Yenagoa"
  ],
  Benue: [
    "Ado",
    "Agatu",
    "Apa",
    "Buruku",
    "Gboko",
    "Guma",
    "Gwer East",
    "Gwer West",
    "Katsina-Ala",
    "Konshisha",
    "Kwande",
    "Logo",
    "Makurdi",
    "Obi",
    "Ogbadibo",
    "Ohimini",
    "Oju",
    "Okpokwu",
    "Otukpo",
    "Tarka",
    "Ukum",
    "Ushongo",
    "Vandeikya"
  ],
  Borno: [
    "Abadam",
    "Askira/Uba",
    "Bama",
    "Bayo",
    "Biu",
    "Chibok",
    "Damboa",
    "Dikwa",
    "Gubio",
    "Guzamala",
    "Gwoza",
    "Hawul",
    "Jere",
    "Kaga",
    "Kala/Balge",
    "Konduga",
    "Kukawa",
    "Kwaya Kusar",
    "Mafa",
    "Magumeri",
    "Maiduguri",
    "Marte",
    "Mobbar",
    "Monguno",
    "Ngala",
    "Nganzai",
    "Shani"
  ],
  "Cross River": [
    "Abi",
    "Akamkpa",
    "Akpabuyo",
    "Bakassi",
    "Bekwarra",
    "Biase",
    "Boki",
    "Calabar Municipal",
    "Calabar South",
    "Etung",
    "Ikom",
    "Obanliku",
    "Obubra",
    "Obudu",
    "Odukpani",
    "Ogoja",
    "Yakuur",
    "Yala"
  ],
  Delta: [
    "Aniocha North",
    "Aniocha South",
    "Bomadi",
    "Burutu",
    "Ethiope East",
    "Ethiope West",
    "Ika North East",
    "Ika South",
    "Isoko North",
    "Isoko South",
    "Ndokwa East",
    "Ndokwa West",
    "Okpe",
    "Oshimili North",
    "Oshimili South",
    "Patani",
    "Sapele",
    "Udu",
    "Ughelli North",
    "Ughelli South",
    "Ukwuani",
    "Uvwie",
    "Warri North",
    "Warri South",
    "Warri South West"
  ],
  Ebonyi: [
    "Abakaliki",
    "Afikpo North",
    "Afikpo South",
    "Ebonyi",
    "Ezza North",
    "Ezza South",
    "Ikwo",
    "Ishielu",
    "Ivo",
    "Izzi",
    "Ohaozara",
    "Ohaukwu",
    "Onicha"
  ],
  Edo: [
    "Akoko-Edo",
    "Egor",
    "Esan Central",
    "Esan North-East",
    "Esan South-East",
    "Esan West",
    "Etsako Central",
    "Etsako East",
    "Etsako West",
    "Igueben",
    "Ikpoba-Okha",
    "Oredo",
    "Orhionmwon",
    "Ovia North-East",
    "Ovia South-West",
    "Owan East",
    "Owan West",
    "Uhunmwonde"
  ],
  Ekiti: [
    "Ado Ekiti",
    "Efon",
    "Ekiti East",
    "Ekiti South-West",
    "Ekiti West",
    "Emure",
    "Gbonyin",
    "Ido/Osi",
    "Ijero",
    "Ikere",
    "Ikole",
    "Ilejemeje",
    "Irepodun/Ifelodun",
    "Ise/Orun",
    "Moba",
    "Oye"
  ],
  Enugu: [
    "Aninri",
    "Awgu",
    "Enugu East",
    "Enugu North",
    "Enugu South",
    "Ezeagu",
    "Igbo Etiti",
    "Igbo Eze North",
    "Igbo Eze South",
    "Isi Uzo",
    "Nkanu East",
    "Nkanu West",
    "Nsukka",
    "Oji River",
    "Udenu",
    "Udi",
    "Uzo-Uwani"
  ],
  "Federal Capital Territory": [
    "Abaji",
    "Bwari",
    "Gwagwalada",
    "Kuje",
    "Kwali",
    "Municipal Area Council"
  ],
  Gombe: [
    "Akko",
    "Balanga",
    "Billiri",
    "Dukku",
    "Funakaye",
    "Gombe",
    "Kaltungo",
    "Kwami",
    "Nafada",
    "Shongom",
    "Yamaltu/Deba"
  ],
  Imo: [
    "Aboh Mbaise",
    "Ahiazu Mbaise",
    "Ehime Mbano",
    "Ezinihitte",
    "Ideato North",
    "Ideato South",
    "Ihitte/Uboma",
    "Ikeduru",
    "Isiala Mbano",
    "Isu",
    "Mbaitoli",
    "Ngor Okpala",
    "Njaba",
    "Nkwerre",
    "Nwangele",
    "Obowo",
    "Oguta",
    "Ohaji/Egbema",
    "Okigwe",
    "Orlu",
    "Orsu",
    "Oru East",
    "Oru West",
    "Owerri Municipal",
    "Owerri North",
    "Owerri West"
  ],
  Jigawa: [
    "Auyo",
    "Babura",
    "Biriniwa",
    "Birnin Kudu",
    "Buji",
    "Dutse",
    "Gagarawa",
    "Garki",
    "Gumel",
    "Guri",
    "Gwaram",
    "Gwiwa",
    "Hadejia",
    "Jahun",
    "Kafin Hausa",
    "Kaugama",
    "Kazaure",
    "Kirikasamma",
    "Kiyawa",
    "Maigatari",
    "Malam Madori",
    "Miga",
    "Ringim",
    "Roni",
    "Sule Tankarkar",
    "Taura",
    "Yankwashi"
  ],
  Kaduna: [
    "Birnin Gwari",
    "Chikun",
    "Giwa",
    "Igabi",
    "Ikara",
    "Jaba",
    "Jema'a",
    "Kachia",
    "Kaduna North",
    "Kaduna South",
    "Kagarko",
    "Kajuru",
    "Kaura",
    "Kauru",
    "Kubau",
    "Kudan",
    "Lere",
    "Makarfi",
    "Sabon Gari",
    "Sanga",
    "Soba",
    "Zaria"
  ],
  Kano: [
    "Ajingi",
    "Albasu",
    "Bagwai",
    "Bebeji",
    "Bichi",
    "Bunkure",
    "Dala",
    "Dambatta",
    "Dawakin Kudu",
    "Dawakin Tofa",
    "Doguwa",
    "Fagge",
    "Gabasawa",
    "Garko",
    "Garun Mallam",
    "Gaya",
    "Gezawa",
    "Gwale",
    "Gwarzo",
    "Kabo",
    "Kano Municipal",
    "Karaye",
    "Kibiya",
    "Kiru",
    "Kumbotso",
    "Kunchi",
    "Kura",
    "Madobi",
    "Makoda",
    "Minjibir",
    "Nasarawa",
    "Rano",
    "Rimin Gado",
    "Rogo",
    "Shanono",
    "Sumaila",
    "Takai",
    "Tarauni",
    "Tofa",
    "Tsanyawa",
    "Tudun Wada",
    "Ungogo",
    "Warawa",
    "Wudil"
  ],
  Katsina: [
    "Baure",
    "Bindawa",
    "Charanchi",
    "Dan Musa",
    "Dandume",
    "Danja",
    "Daura",
    "Dutsi",
    "Faskari",
    "Funtua",
    "Ingawa",
    "Jibia",
    "Kafur",
    "Kaita",
    "Kankara",
    "Kankia",
    "Katsina",
    "Kurfi",
    "Kusada",
    "Mai'Adua",
    "Malumfashi",
    "Mani",
    "Mashi",
    "Matazu",
    "Musawa",
    "Rimi",
    "Sabuwa",
    "Safana",
    "Sandamu",
    "Zango"
  ],
  Kebbi: [
    "Aleiro",
    "Arewa Dandi",
    "Argungu",
    "Augie",
    "Bagudo",
    "Birnin Kebbi",
    "Bunza",
    "Dandi",
    "Fakai",
    "Gwandu",
    "Jega",
    "Kalgo",
    "Koko/Besse",
    "Maiyama",
    "Ngaski",
    "Sakaba",
    "Shanga",
    "Suru",
    "Tamale",
    "Wasagu/Danko",
    "Yauri",
    "Zuru"
  ],
  Kogi: [
    "Adavi",
    "Ajaokuta",
    "Ankpa",
    "Bassa",
    "Dekina",
    "Ibaji",
    "Idah",
    "Igalamela-Odolu",
    "Ijumu",
    "Kabba/Bunu",
    "Kogi",
    "Lokoja",
    "Mopa-Muro",
    "Ofu",
    "Ogori/Mangongo",
    "Okehi",
    "Okene",
    "Olamaboro",
    "Omala",
    "Yagba East",
    "Yagba West"
  ],
  Kwara: [
    "Asa",
    "Baruten",
    "Edu",
    "Ekiti",
    "Ifelodun",
    "Ilorin East",
    "Ilorin South",
    "Ilorin West",
    "Irepodun",
    "Jebba",
    "Kaiama",
    "Moro",
    "Offa",
    "Oke-Ero",
    "Oyun",
    "Pategi"
  ],
  Lagos: [
    "Agege",
    "Ajeromi-Ifelodun",
    "Alimosho",
    "Amuwo-Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti-Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere",
    "Yewa South"
  ],
  Nasarawa: [
    "Akwanga",
    "Doma",
    "Karu",
    "Keffi",
    "Kokona",
    "Lafia",
    "Nasarawa",
    "Nasarawa Eggon",
    "Obi",
    "Toto",
    "Wamba"
  ],
  Niger: [
    "Agaie",
    "Agwara",
    "Bida",
    "Borgu",
    "Bosso",
    "Chanchaga",
    "Edati",
    "Gbako",
    "Gurara",
    "Katcha",
    "Kontagora",
    "Lapai",
    "Lavun",
    "Magama",
    "Mariga",
    "Mashegu",
    "Mokwa",
    "Moya",
    "Paikoro",
    "Rafi",
    "Rijau",
    "Shiroro",
    "Suleja",
    "Tafa",
    "Wushishi"
  ],
  Ogun: [
    "Abeokuta North",
    "Abeokuta South",
    "Ado-Odo/Ota",
    "Egbado North",
    "Egbado South",
    "Ewekoro",
    "Ifo",
    "Ijebu East",
    "Ijebu North",
    "Ijebu North East",
    "Ijebu Ode",
    "Ikenne",
    "Imeko Afon",
    "Ipokia",
    "Obafemi Owode",
    "Odeda",
    "Odogbolu",
    "Ogun Waterside",
    "Remo North",
    "Sagamu",
    "Yewa North",
    "Yewa South"
  ],
  Ondo: [
    "Akoko North-East",
    "Akoko North-West",
    "Akoko South-West",
    "Akoko South-East",
    "Akure North",
    "Akure South",
    "Ese Odo",
    "Idanre",
    "Ifedore",
    "Ilaje",
    "Ile Oluji/Okeigbo",
    "Irele",
    "Odigbo",
    "Okitipupa",
    "Ondo East",
    "Ondo West",
    "Ose",
    "Owo"
  ],
  Osun: [
    "Atakumosa East",
    "Atakumosa West",
    "Ayedaade",
    "Ayedire",
    "Boluwaduro",
    "Boripe",
    "Ede North",
    "Ede South",
    "Egbedore",
    "Ejigbo",
    "Ife Central",
    "Ife East",
    "Ife North",
    "Ife South",
    "Ifelodun",
    "Ila",
    "Ilesa East",
    "Ilesa West",
    "Irepodun",
    "Isokan",
    "Iwo",
    "Obokun",
    "Odo Otin",
    "Ola Oluwa",
    "Olorunda",
    "Oriade",
    "Orolu",
    "Osogbo"
  ],
  Oyo: [
    "Afijio",
    "Akinyele",
    "Atiba",
    "Atigbo",
    "Egbeda",
    "Ibadan North",
    "Ibadan North-East",
    "Ibadan North-West",
    "Ibadan South-East",
    "Ibadan South-West",
    "Ibarapa Central",
    "Ibarapa East",
    "Ibarapa North",
    "Ido",
    "Irepo",
    "Iseyin",
    "Itesiwaju",
    "Iwajowa",
    "Kajola",
    "Lagelu",
    "Ogbomosho North",
    "Ogbomosho South",
    "Ogo Oluwa",
    "Olorunsogo",
    "Oluyole",
    "Ona-Ara",
    "Orelope",
    "Orire",
    "Oyo East",
    "Oyo West",
    "Saki East",
    "Saki West",
    "Surulere"
  ],
  Plateau: [
    "Barkin Ladi",
    "Bassa",
    "Bokkos",
    "Jos East",
    "Jos North",
    "Jos South",
    "Kanam",
    "Kanke",
    "Langtang North",
    "Langtang South",
    "Mangu",
    "Mikang",
    "Pankshin",
    "Qua'an Pan",
    "Riyom",
    "Shendam",
    "Wase"
  ],
  Rivers: [
    "Abua/Odual",
    "Ahoada East",
    "Ahoada West",
    "Akuku-Toru",
    "Andoni",
    "Asari-Toru",
    "Bonny",
    "Degema",
    "Eleme",
    "Emohua",
    "Etche",
    "Gokana",
    "Ikwerre",
    "Khana",
    "Obio/Akpor",
    "Ogba/Egbema/Ndoni",
    "Ogu/Bolo",
    "Okrika",
    "Omuma",
    "Opobo/Nkoro",
    "Oyigbo",
    "Port Harcourt",
    "Tai"
  ],
  Sokoto: [
    "Binji",
    "Bodinga",
    "Dange Shuni",
    "Gada",
    "Goronyo",
    "Gudu",
    "Gwadabawa",
    "Illela",
    "Kebbe",
    "Kware",
    "Rabah",
    "Sabon Birni",
    "Shagari",
    "Silame",
    "Sokoto North",
    "Sokoto South",
    "Tambuwal",
    "Tangaza",
    "Tureta",
    "Wamako",
    "Wurno",
    "Yabo"
  ],
  Taraba: [
    "Ardo Kola",
    "Bali",
    "Donga",
    "Gashaka",
    "Gassol",
    "Ibi",
    "Jalingo",
    "Karim Lamido",
    "Kumi",
    "Lau",
    "Sardauna",
    "Takum",
    "Ussa",
    "Wukari",
    "Yorro",
    "Zing"
  ],
  Yobe: [
    "Bade",
    "Bursari",
    "Damaturu",
    "Fika",
    "Fune",
    "Geidam",
    "Gujba",
    "Gulani",
    "Jakusko",
    "Karasuwa",
    "Machina",
    "Nangere",
    "Nguru",
    "Potiskum",
    "Tarmuwa",
    "Yunusari",
    "Yusufari"
  ],
  Zamfara: [
    "Anka",
    "Bakura",
    "Birnin Magaji/Kiyaw",
    "Bukkuyum",
    "Bungudu",
    "Gummi",
    "Gusau",
    "Kaura Namoda",
    "Maradun",
    "Maru",
    "Shinkafi",
    "Talata Mafara",
    "Tsafe",
    "Zurmi"
  ]
};

const lgaNameFixes = {
  "Urue-Offong/Oruko": "Urue-Offong Oruko",
  "Kolokuma/Opokuma": "Kolokuma Opokuma",
  "Irepodun/Ifelodun": "Irepodun Ifelodun",
  "Ohaji/Egbema": "Ohaji Egbema",
  "Koko/Besse": "Koko Besse",
  "Ihitte/Uboma": "Ihitte Uboma",
  "Ado-Odo/Ota": "Ado-Odo Ota",
  "Igalamela-Odolu": "Igalamela Odolu",
  "Mopa-Muro": "Mopa Muro",
  "Ogori/Mangongo": "Ogori Mangongo",
  "Kabba/Bunu": "Kabba Bunu",
  "Yewa South": "Yewa South",
  "Egbado South": "Egbado South",
  "Birnin Magaji/Kiyaw": "Birnin Magaji Kiyaw",
  "Isuikwuato": "Isuikwuato",
  "No exact issue": "No exact issue"
};

const blacklistedLgas = new Set([
  "Irepodun/Ifelodun",
  "Urue-Offong/Oruko",
  "Ohaji/Egbema",
  "Kolokuma/Opokuma",
  "Koko/Besse",
  "Ihitte/Uboma",
  "Birnin Magaji/Kiyaw"
]);

function normalizeLgaName(name) {
  return (lgaNameFixes[name] || name).replace(/\s*\/\s*/g, " ").trim();
}

function buildLocationQuery(lga, state) {
  const normalizedLga = normalizeLgaName(lga);
  return `${normalizedLga}, ${state}, Nigeria`;
}

function formatDay(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

function formatTime(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(date);
}

function updateLocationChip(value) {
  if (locationChip) {
    locationChip.textContent = value;
  }
}

function getWeatherDetails(code) {
  return weatherCodeMap[code] || { label: "Unknown", icon: "❔" };
}

function renderCurrentWeather(data) {
  const current = data.current;
  const weather = getWeatherDetails(current.weather_code);

  locationName.textContent = data.locationName || "Weather";
  updateLocationChip(data.locationName || "Weather");
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

async function geocodeLocation(query) {
  const geocodeUrl =
    "https://geocoding-api.open-meteo.com/v1/search?" +
    new URLSearchParams({
      name: query,
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
    return null;
  }

  const place = result.results[0];
  return {
    lat: place.latitude,
    lon: place.longitude,
    label: `${place.name}${place.country ? ", " + place.country : ""}`
  };
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
  const baseQuery = city.trim();
  if (!baseQuery) {
    throw new Error("Please enter a city name or choose a state and LGA.");
  }

  const directMatch = await geocodeLocation(baseQuery);
  if (directMatch) {
    return directMatch;
  }

  const withNigeria = await geocodeLocation(`${baseQuery}, Nigeria`);
  if (withNigeria) {
    return withNigeria;
  }

  const normalized = baseQuery.replace(/\s*\/\s*/g, " ");
  if (normalized !== baseQuery) {
    const normalizedMatch = await geocodeLocation(normalized);
    if (normalizedMatch) {
      return normalizedMatch;
    }
  }

  throw new Error(`No matching city found for "${city}".`);
}

function populateStates() {
  const states = Object.keys(nigeriaStateLgas).sort();
  stateSelect.innerHTML = `<option value="">Select state</option>${states
    .map((state) => `<option value="${state}">${state}</option>`)
    .join("")}`;
  lgaSelect.innerHTML = `<option value="">Select LGA</option>`;
}

function updateLocalGovAreas() {
  const selectedState = stateSelect.value;
  const localGovs = selectedState ? nigeriaStateLgas[selectedState] || [] : [];

  const filteredLocalGovs = localGovs.filter((lga) => !blacklistedLgas.has(lga));

  lgaSelect.innerHTML = `<option value="">Select LGA</option>${filteredLocalGovs
    .map((lga) => `<option value="${lga}">${normalizeLgaName(lga)}</option>`)
    .join("")}`;
}

async function applySelectedLocation() {
  const state = stateSelect.value;
  const lga = lgaSelect.value;
  if (!state || !lga) return;

  const locationNameText = buildLocationQuery(lga, state);
  cityInput.value = locationNameText;
  updateLocationChip(locationNameText);

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
    updateLocationChip(place.label);
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
  const defaultLga = "Surulere";
  stateSelect.value = defaultState;
  updateLocalGovAreas();
  lgaSelect.value = defaultLga;
  const defaultQuery = buildLocationQuery(defaultLga, defaultState);
  cityInput.value = defaultQuery;
  updateLocationChip(defaultQuery);

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
