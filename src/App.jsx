import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import UnitToggle from './components/UnitToggle';
import { getWeatherBackground } from './utils/weatherUtils';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState(''); // Holds the current input value for the search bar
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  // Stores the last successfully fetched location to re-fetch when unit changes
  const [currentLocation, setCurrentLocation] = useState({ city: null, lat: null, lon: null });

  // useCallback memoizes fetchData to prevent unnecessary re-creations
  const fetchData = useCallback(async (location, lat = null, lon = null) => {
    setLoading(true);
    setError('');
    setWeatherData(null);
    setForecastData(null);

    let currentWeatherUrl;
    let forecastUrl;

    if (location) {
      currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${API_KEY}`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&appid=${API_KEY}`;
      // Update the stored current location
      setCurrentLocation({ city: location, lat: null, lon: null });
    } else if (lat !== null && lon !== null) {
      currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
      // Update the stored current location (city name will be updated after successful fetch)
      setCurrentLocation({ city: null, lat: lat, lon: lon });
    } else {
      setError('Please enter a city name or enable geolocation.');
      setLoading(false);
      return;
    }

    try {
      const weatherResponse = await axios.get(currentWeatherUrl);
      setWeatherData(weatherResponse.data);

      // If fetched by lat/lon, update the `city` state with the actual city name
      // and update `currentLocation` to include the city name for future re-fetches.
      if (!location && weatherResponse.data && weatherResponse.data.name) {
        setCity(weatherResponse.data.name);
        setCurrentLocation(prev => ({ ...prev, city: weatherResponse.data.name }));
      }

      const forecastResponse = await axios.get(forecastUrl);
      const dailyForecastsMap = new Map();
      const dailyTemps = new Map();

      forecastResponse.data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        if (!dailyTemps.has(date)) {
          dailyTemps.set(date, []);
        }
        dailyTemps.get(date).push(item.main.temp);
      });

      // Aggregate daily forecasts, picking a midday entry and calculating min/max temps
      forecastResponse.data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const hour = new Date(item.dt * 1000).getHours();

        // This logic aims to pick a representative forecast for the day, typically around noon.
        // It also ensures we only add one entry per day, using the first suitable hourly forecast.
        if (!dailyForecastsMap.has(date) && hour >= 11 && hour <= 13) {
          const temps = dailyTemps.get(date);
          dailyForecastsMap.set(date, {
            dt: item.dt,
            date,
            temp: Math.round(item.main.temp),
            temp_max: Math.round(Math.max(...temps)),
            temp_min: Math.round(Math.min(...temps)),
            icon: item.weather[0].icon,
            description: item.weather[0].description
          });
        }
      });
      // Slice to get only the next 5 days of forecast
      setForecastData(Array.from(dailyForecastsMap.values()).slice(0, 5));
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('City not found. Please check the spelling and try again.');
        } else if (err.response.status === 401) {
          setError('Invalid API key. Please check your .env file.');
        } else {
          setError(`Server error: ${err.response.status}. Please try again later.`);
        }
      } else if (err.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error fetching weather data:', err);
      // Clear previous weather data on error
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [unit]); // fetchData depends on `unit` to correctly form API URLs

  // useEffect to handle initial data fetch (geolocation or default)
  // and re-fetching when `unit` changes.
  useEffect(() => {
    // Only fetch if we have a current location stored (either city name or lat/lon)
    // or if it's the initial load and no location has been set yet.
    if (currentLocation.city) {
      fetchData(currentLocation.city);
    } else if (currentLocation.lat !== null && currentLocation.lon !== null) {
      fetchData(null, currentLocation.lat, currentLocation.lon);
    } else {
      // This block runs only on the very first mount if no location is set.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchData(null, position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            console.warn(`Geolocation error: ${err.message}`);
            fetchData('London'); // Fallback to London if geolocation fails
          }
        );
      } else {
        fetchData('London'); // Fallback to London if geolocation is not supported
      }
    }
  }, [unit, fetchData, currentLocation.city, currentLocation.lat, currentLocation.lon]); // Dependencies for this effect

  // Handles city search submission
  const handleCitySearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchData(city.trim()); // Call fetchData with the city from the input
      setCity(''); // Clear the input field after search
    } else {
      setError('Please enter a city name to search.');
    }
  };

  // Handles geolocation button click
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError('');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchData(null, position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError('Unable to retrieve your location. Please try searching by city.');
          setLoading(false);
          console.error('Geolocation error:', err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  // Toggles between 'metric' (Celsius) and 'imperial' (Fahrenheit)
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    // The useEffect hook above will automatically detect this unit change and re-fetch data.
  };

  // Determine background class based on weather condition
  const backgroundClass = weatherData ? getWeatherBackground(weatherData.weather[0].main) : 'from-blue-500 to-purple-600';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundClass} flex flex-col items-center p-4 font-inter transition-colors duration-1000 ease-in-out`}>
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-7xl min-h-[calc(100vh-2rem)] flex flex-col border border-white border-opacity-30">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-white drop-shadow-lg flex-shrink-0">
          Weather Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 flex-shrink-0">
          <SearchBar
            city={city}
            setCity={setCity}
            handleSubmit={handleCitySearch}
            handleGeolocation={handleGeolocation}
            loading={loading}
          />
          <UnitToggle unit={unit} toggleUnit={toggleUnit} />
        </div>

        {loading && (
          <div className="text-center text-xl text-white animate-pulse flex-grow flex items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-white mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-3">Fetching weather data...</span>
          </div>
        )}

        {error && (
          <div className="text-center text-red-200 text-lg p-4 bg-red-800 bg-opacity-40 rounded-lg shadow-inner flex-grow flex items-center justify-center">
            {error}
          </div>
        )}

        {weatherData && (
          <div className="flex flex-col lg:flex-row gap-8 flex-grow min-h-0">
            <div className="lg:w-1/2 flex flex-col min-h-0">
              <WeatherDisplay weatherData={weatherData} unit={unit} />
            </div>

            <div className="lg:w-1/2 flex flex-col min-h-0">
              {forecastData && <ForecastDisplay forecastData={forecastData} unit={unit} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;