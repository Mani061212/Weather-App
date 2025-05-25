export const getWeatherIcon = (iconCode) => {
  if (!iconCode) return '';
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getWeatherBackground = (weatherMain) => {
  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return 'from-blue-300 to-yellow-300'; // Sunny, clear sky
    case 'clouds':
      return 'from-gray-400 to-blue-400'; // Cloudy
    case 'rain':
    case 'drizzle':
      return 'from-gray-600 to-blue-700'; // Rainy
    case 'thunderstorm':
      return 'from-gray-800 to-purple-800'; // Thunderstorm
    case 'snow':
      return 'from-blue-200 to-blue-400'; // Snowy
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return 'from-gray-500 to-gray-700'; // Atmospheric conditions
    default:
      return 'from-blue-500 to-purple-600'; // Default gradient
  }
};

export const formatTime = (timestamp, timezoneOffsetSeconds) => {
  const date = new Date(timestamp * 1000);
  const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  const cityTime = new Date(utc + (timezoneOffsetSeconds * 1000));

  return cityTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};