import React from 'react';

function UnitToggle({ unit, toggleUnit }) {
  return (
    <div className="flex justify-center sm:justify-end">
      <button
        onClick={toggleUnit}
        className="px-5 py-2 bg-white bg-opacity-40 rounded-full text-lg font-semibold text-gray-800 shadow-md hover:bg-opacity-50 hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70"
      >
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
}

export default UnitToggle;