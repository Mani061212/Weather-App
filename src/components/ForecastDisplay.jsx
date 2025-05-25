import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getWeatherIcon } from '../utils/weatherUtils';

function ForecastDisplay({ forecastData, unit }) {
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  const chartData = forecastData.map(day => ({
    name: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    'Max Temp': Math.round(day.temp_max),
    'Min Temp': Math.round(day.temp_min),
  }));

  return (
    <div className="h-full flex flex-col p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
      {/* 5-Day Forecast Section */}
      <div className="flex-shrink-0">
        <h3 className="text-xl font-semibold text-white text-center mb-3 drop-shadow-lg tracking-wide">
          5-Day Forecast
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-3">
          {forecastData.map((day, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/20 to-white/10 p-2 rounded-xl shadow-lg flex flex-col items-center text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10"
            >
              <p className="font-semibold text-sm mb-1 tracking-wide">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <img
                src={getWeatherIcon(day.icon)}
                alt={day.description}
                className="w-12 h-12 mb-1"
              />
              <p className="capitalize text-xs mb-1 tracking-wide">{day.description}</p>
              <p className="font-bold text-base">
                {Math.round(day.temp_max)}{tempUnit} / {Math.round(day.temp_min)}{tempUnit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Temperature Trend Chart */}
      <div className="mt-auto h-[300px] overflow-hidden">
        <h3 className="text-xl font-semibold text-white text-center mb-3 drop-shadow-lg tracking-wide">
          Temperature Trend
        </h3>
        <div className="bg-gradient-to-br from-white/20 to-white/10 p-3 rounded-xl shadow-lg h-full border border-white/10 overflow-hidden">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <XAxis
                dataKey="name"
                stroke="#fff"
                tick={{ fontSize: 10, fill: '#fff', fontWeight: 'medium' }}
                tickMargin={2}
              />
              <YAxis stroke="#fff" unit={tempUnit} tick={{ fontSize: 10, fill: '#fff' }} />
              <Tooltip
                formatter={(value, name) => [`${value}${tempUnit}`, name]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#333',
                  fontSize: '10px',
                  padding: '4px',
                }}
                labelStyle={{ color: '#333', fontSize: '10px', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="Max Temp" stroke="#8884d8" strokeWidth={1} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="Min Temp" stroke="#82ca9d" strokeWidth={1} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ForecastDisplay;