/* eslint-disable no-console */
import './style.css';

const searchBtn = document.getElementById('searchBtn');

const API_KEY = '8192c09f7e2f410bb9b195056240704';
const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

async function getWeather(location: string) {
  const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${location}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}

function displayWeather(weatherData: string) {
  // Add code here to display weather data on the UI
  // do humidity, temp, location, etc
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
