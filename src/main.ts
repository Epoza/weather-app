/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import './style.css';

const searchBtn = document.getElementById('searchBtn');

// Get elements to display weather

const locationName = document.getElementById('locationNameText');
const locationRegion = document.getElementById('locationRegionText');
const condition = document.getElementById('conditionText');
const tempF = document.getElementById('tempFText');
const tempFFeels = document.getElementById('tempFFeelsText');
const humidity = document.getElementById('humidityText');
const cloudiness = document.getElementById('cloudinessText');
const wind = document.getElementById('windText');
const uv = document.getElementById('uvText');

const API_KEY = '8192c09f7e2f410bb9b195056240704';
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

async function getWeather(location: string) {
  const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${location}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}

function formatDate(inputDate: string) {
  // Parse the input string date
  const date = new Date(inputDate);

  // Define arrays for day names and month names
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Extract day, month, year, hour, and minute
  const dayOfWeek = daysOfWeek[date.getDay()];
  const month = monthsOfYear[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const period = hour >= 12 ? 'PM' : 'AM';

  // Convert hour to 12-hour format
  hour = hour % 12 || 12;

  // Format the date string
  const formattedDate = `${dayOfWeek} ${month} ${day}, ${year} at ${hour}:${minute.toString().padStart(2, '0')} ${period}`;

  return formattedDate;
}

function displayWeather(weatherData: any) {
  // Add code here to display weather data on the UI
  const currentWeather = weatherData.current;
  const weatherLocation = weatherData.location;
  // get location first weatherlocation.name & region
  console.log(weatherLocation.name);
  locationName!.innerText = weatherLocation.name;
  // Display state if USA else display country
  locationRegion!.innerText =
    weatherLocation.country === 'United States of America'
      ? weatherLocation.region
      : weatherLocation.country;

  // day
  const currentDate = formatDate(currentWeather.last_updated);
  console.log(currentDate);
  // current condition currentWeather.condition.text with giphy api
  console.log(currentWeather.condition.text);
  condition!.innerText = currentWeather.condition.text;
  // temp
  console.log(`${currentWeather.temp_f}degreesymbol f`);
  tempF!.innerText = `${currentWeather.temp_f}degreesymbol f`;
  // feels like f
  console.log(`feels like ${currentWeather.feelslike_f}degreesymbol f`);
  tempFFeels!.innerText = `feels like ${currentWeather.feelslike_f}degreesymbol f`;
  // humidity
  console.log(`${currentWeather.humidity}%`);
  humidity!.innerText = `${currentWeather.humidity}%`;
  // cloudiness
  console.log(`${currentWeather.cloud}%`);
  cloudiness!.innerText = `${currentWeather.cloud}%`;
  // wind
  console.log(`${currentWeather.wind_mph}mph`);
  wind!.innerText = `${currentWeather.wind_mph}mph`;
  // uv
  console.log(currentWeather.uv);
  uv!.innerText = currentWeather.uv;
  console.log(weatherData);
}

async function getNewLocation() {
  console.log('hi');
  const locationSearch = document.getElementById(
    'locationSearch'
  ) as HTMLInputElement;

  if (locationSearch) {
    const location = locationSearch.value.trim();
    try {
      const weatherData = await getWeather(location);
      displayWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  } else {
    // Handle the case when the element is not empty or not found
  }
}

searchBtn?.addEventListener('click', () => {
  getNewLocation();
});
