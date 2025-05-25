import React from 'react';

function SearchBar({ city, setCity, handleSubmit, handleGeolocation, loading }) {
  return (
    // Changed the outer div to a form element
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-grow">
      <input
        type="text"
        className="flex-grow p-3 rounded-xl bg-white bg-opacity-30 border border-white border-opacity-40 text-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60 transition duration-200"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit" // This button will now correctly trigger the form's onSubmit
        className="px-6 py-3 bg-white bg-opacity-40 rounded-xl text-lg font-semibold text-blue-900 shadow-md hover:bg-opacity-50 hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70 transform hover:-translate-y-0.5"
        disabled={loading}
      >
        Search
      </button>
      <button
        type="button" // This should remain type="button" to not trigger form submit
        onClick={handleGeolocation}
        className="px-6 py-3 bg-white bg-opacity-40 rounded-xl text-lg font-semibold text-purple-900 shadow-md hover:bg-opacity-50 hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-70 transform hover:-translate-y-0.5"
        disabled={loading}
      >
        My Location
      </button>
    </form>
  );
}

export default SearchBar;