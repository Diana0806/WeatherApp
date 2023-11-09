
import './App.css';
import Header from './Header';
import Weather from './Weather';
import React, { useState, useEffect } from 'react';

function App() {
  const [userLocation, setUserLocation] = useState('Lyon');
  const [weatherData, setWeatherData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // utilise un service externe de reverse geocoding pour avoir la ville
        // à partir d'une longitude et d'une latitude
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then((response) => response.json())
        .then((data) => {
           const cityName = data.display_name;
            setUserLocation(cityName);
        })
        .catch((error) => {
          console.error('Error while fetching weather data:', error);
      });
    });
    } else {
      console.error('Geolocation is not available.');
    }
  }, []);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const API_URL = process.env.REACT_APP_API_URL + `key=${API_KEY}&q=${userLocation}&days=5&aqi=no&alerts=no
        `;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (isDataLoaded === false) {
          setWeatherData(data);
          setIsDataLoaded(true);
        }

      })
      .catch((error) => {
        console.error('Error while fetching weather data:', error);
      });
  }, [userLocation]);

  function handleClickDay(event){
    document.querySelector('.clickedDay').classList.remove('clickedDay')
    event.target.classList.add('clickedDay')
    setSelectedDay(event.target.id);
  }

  return (
    <>
      <div className="App">
        <Header />

        {isDataLoaded ? (
          <Weather city={userLocation}
            icon={weatherData.forecast.forecastday[selectedDay].day.condition.icon} 
            tempC={weatherData.forecast.forecastday[selectedDay].day.avgtemp_c}
            windSpeed={weatherData.forecast.forecastday[selectedDay].day.maxwind_kph}
            windDegree={weatherData.forecast.forecastday[selectedDay].hour[0].wind_degree}
            handleClickDay={handleClickDay}
            />
        ) : (
          <p>... LOADING</p>
        )}
      </div>
    </>
  );
}

export default App;
