# 🌤️ WeatherWise Dashboard

**WeatherWise Dashboard** is a dynamic and responsive weather application built using **React**, **Vite**, and **Tailwind CSS**. It provides real-time weather information and a 5-day forecast for any city worldwide, powered by the **OpenWeatherMap API**.

---

## 🚀 Features

- **Current Weather Display**  
  View temperature, humidity, wind speed, "feels like" temperature, pressure, visibility, and sunrise/sunset times.

- **5-Day Forecast**  
  Summarized forecast for the next five days with weather icons and high/low temperatures.

- **Temperature Trend Chart**  
  Visual representation of forecasted temperatures using a line chart.

- **City Search**  
  Search by city name to get weather updates.

- **Geolocation Support**  
  Automatically fetches the weather for your current location (browser permission required).

- **Unit Toggle**  
  Switch between **Celsius (°C)** and **Fahrenheit (°F)**.

- **Responsive Design**  
  Optimized layout for mobile, tablet, and desktop screens.

- **Dynamic Backgrounds**  
  Background gradient changes based on current weather conditions.

- **Interactive UI**  
  Smooth hover effects and interactive components enhance the user experience.

---

## 🛠️ Tech Stack

- **React** – Frontend library  
- **Vite** – Lightning-fast dev server and bundler  
- **Tailwind CSS** – Utility-first CSS framework  
- **Axios** – HTTP client for API requests  
- **Recharts** – React charting library  
- **OpenWeatherMap API** – Weather data provider  

---

## ⚙️ Setup & Installation

1. **Clone the Repository:**

```bash
git clone <your-repository-url>
cd weatherwise-dashboard

```

## ⚙️ Install Dependencies

```bash
npm install
# or
yarn install

```
## 🔑 Get Your API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org)

2. Navigate to the **API keys** section in your account

3. Generate a new API key

## 🧪 Create a `.env` File in the Project Root

Create a file named `.env` in the root directory of your project and add the following line:

```env
VITE_OPEN_WEATHER_API_KEY=YOUR_API_KEY_HERE

```
Replace YOUR_API_KEY_HERE with your actual API key from OpenWeatherMap.

## 🚀 Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
# or
yarn dev

```
Then open your browser and navigate to: (http://localhost:5173)

---

## 📖 Usage

- **Search for a City:** Enter a city name and press **Enter** or click the **Search** button.
- **Use Your Location:** Click the **My Location** button to fetch weather data for your current location.
- **Toggle Units:** Click the button to switch between **Celsius** and **Fahrenheit**.

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve the project, please:

1. **Fork** the repository  
2. **Create** your feature branch  
3. **Commit** your changes  
4. **Submit** a pull request

Feel free to open [issues](https://github.com/) for suggestions or bug reports.

---

## 📄 License

This project is licensed under the **MIT License**.

---

Made with ❤️ using **React**, **Tailwind CSS**, and **OpenWeatherMap**.

