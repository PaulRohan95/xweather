import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');


  const API_KEY = '5993be708da14759976101347242401';


  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setWeatherData(null);


    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
      setWeatherData(response.data);
    } catch (error) {
      alert ('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="weather-app">
      <div className="search-bar">
          <input 
          type='text' 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter city name'
          className="search-input"/>
          <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {error && <h6>{error}</h6>}
      {weatherData && (
        <div className='weather-cards'>
          <div className='weather-card'>
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className='weather-card'>
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className='weather-card'>
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className='weather-card'>
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
