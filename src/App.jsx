import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '255241b19ed3adc73102ac1fba4e8c8e';

  useEffect(() => {
    if (searchCity === '') return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          throw new Error('City not found');
        }

        const data = await response.json();
        setWeatherData({
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          condition: data.weather[0].main,
          name: data.name,
          country: data.sys.country,
        });
      } catch (error) {
        setWeatherData(null);
        alert(error.message);
      }
    };

    fetchWeather();
  }, [searchCity]);

  const handleSearch = () => {
    if (city.trim() === '') return;
    setSearchCity(city);
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button
          onClick={handleSearch}
          className="search-button"
        >
          Search
        </button>
      </div>

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}, {weatherData.country}</h2>
          <p className="temp">{weatherData.temp}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Condition: {weatherData.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;