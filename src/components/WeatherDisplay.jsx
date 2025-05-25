import React from 'react';
import { getWeatherIcon, formatTime } from '../utils/weatherUtils';

// Helper function to convert wind direction in degrees to a cardinal direction
const getWindDirection = (degrees) => {
  if (typeof degrees !== 'number') return 'N/A';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

function WeatherDisplay({ weatherData, unit }) {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

  if (!weatherData || !weatherData.main || !weatherData.weather?.[0]) {
    return <div className="text-white text-center">No weather data available.</div>;
  }

  return (
    <div className="text-center h-full flex flex-col p-4 bg-gradient-to-br from-white/10 to/white/5 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
      {/* Current Weather Section */}
      <div className="flex-shrink-0 mb-6 pb-1">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white drop-shadow-xl tracking-tight">
          {weatherData.name || 'Unknown'}, {weatherData.sys?.country || '--'}
        </h2>
        <div className="flex items-center justify-center mb-3">
          <img
            src={getWeatherIcon(weatherData.weather[0].icon || '01d')}
            alt={weatherData.weather[0].description || 'Weather'}
            className="w-24 h-24 md:w-28 md:h-28"
          />
          <p className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl">
            {Math.round(weatherData.main.temp || 0)}{tempUnit}
          </p>
        </div>
        <p className="text-lg md:text-xl capitalize text-white tracking-wide">
          {weatherData.weather[0].description || 'N/A'}
        </p>
      </div>

      {/* Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-center flex-grow">
        <div className="bg-gradient-to-br from-white/20 to/white/10 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10 flex-grow">
          <span className="text-base font-semibold mb-1 text-white tracking-wide">Humidity</span>
          <span className="text-xl font-medium text-white">{typeof weatherData.main.humidity === 'number' ? weatherData.main.humidity : 'N/A'}%</span>
        </div>
        <div className="bg-gradient-to-br from-white/20 to/white/10 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10 flex-grow">
          <span className="text-base font-semibold mb-1 text-white tracking-wide">Wind Speed</span>
          <span className="text-xl font-medium text-white">{typeof weatherData.wind?.speed === 'number' ? weatherData.wind.speed : 'N/A'} {speedUnit}</span>
        </div>
        <div className="bg-gradient-to-br from-white/20 to/white/10 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10 flex-grow">
          <span className="text-base font-semibold mb-1 text-white tracking-wide">Wind Direction</span>
          <span className="text-xl font-medium text-white">{getWindDirection(weatherData.wind?.deg)}</span>
        </div>
        <div className="bg-gradient-to-br from-white/20 to/white/10 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border/white/10 flex-grow">
          <span className="text-base font-semibold mb-1 text-white tracking-wide">Feels Like</span>
          <span className="text-xl font-medium text-white">{typeof weatherData.main.feels_like === 'number' ? Math.round(weatherData.main.feels_like) : 'N/A'}{tempUnit}</span>
        </div>
        <div className="bg-gradient-to-br from/white/20 to/white/10 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border/white/10 flex-grow">
          <span className="text-base font-semibold mb-1 text-white tracking-wide">Pressure</span>
          <span className="text-xl font-medium text-white">{typeof weatherData.main.pressure === 'number' ? weatherData.main.pressure : 'N/A'} hPa</span>
        </div>
        <div className="bg-gradient-to-br from/white/20 to/white/10 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border/white/10 flex-grow">
          <span className="text-base font-semibold mb-1 text-white tracking-wide">Visibility</span>
          <span className="text-xl font-medium text-white">{typeof weatherData.visibility === 'number' ? weatherData.visibility / 1000 : 'N/A'} km</span>
        </div>
        <div className="bg-gradient-to-br from/white/20 to/white/10 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border/white/10 flex-grow">
          <span className="text-base font-semibold mb-1 text-white tracking-wide">Sunrise</span>
          <span className="text-xl font-medium text-white">{weatherData.sys?.sunrise ? formatTime(weatherData.sys.sunrise, weatherData.timezone) : 'N/A'}</span>
        </div>
        <div className="bg-gradient-to-br from/white/20 to/white/10 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border/white/10 flex-grow">
          <span className="text-base font-semibold mb-1 text-white tracking-wide">Sunset</span>
          <span className="text-xl font-medium text-white">{weatherData.sys?.sunset ? formatTime(weatherData.sys.sunset, weatherData.timezone) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;