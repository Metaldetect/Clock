import React, { useState, useEffect } from 'react';
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiCloud,
  WiThunderstorm,
  WiFog,
} from 'react-icons/wi';

function formatLocaleDate(date) {
  const options = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('uk-UA', options);
}

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = 'ec279dc0f8f1c3ba6ccc0382568208cc';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setWeather(data);
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          error => {
            console.error('Помилка отримання місцезнаходження:', error);
          }
        );
      } else {
        console.error('Геолокація не підтримується цим браузером.');
      }
    };

    getLocation();
  }, []);

  if (!weather) {
    return <div>Завантаження погоди...</div>;
  }

  const { name, main, weather: weatherData } = weather;
  const temperature = Math.round(main.temp);

  let weatherIcon;

  switch (weatherData[0].icon) {
    case '01d':
      weatherIcon = <WiDaySunny size={64} className="weather-icon" />;
      break;
    case '02d':
      weatherIcon = <WiCloudy size={64} className="weather-icon" />;
      break;
    case '03d':
    case '04d':
      weatherIcon = <WiCloud size={64} className="weather-icon" />;
      break;
    case '09d':
    case '10d':
      weatherIcon = <WiRain size={64} className="weather-icon" />;
      break;
    case '11d':
      weatherIcon = <WiThunderstorm size={64} className="weather-icon" />;
      break;
    case '13d':
      weatherIcon = <WiSnow size={64} className="weather-icon" />;
      break;
    case '50d':
      weatherIcon = <WiFog size={64} className="weather-icon" />;
      break;
    default:
      weatherIcon = null;
  }

  return (
    <div className="weather-widget">
      <h2 className="widget-location fw-bold mb-4">{name}</h2>
      <div className="widget-weather fst-italic d-flex justify-content-center align-items-center gap-3">
        {weatherIcon}
        <p className="widget-temperature">{temperature}°C</p>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const tick = () => {
      const currentDate = new Date();
      const formattedDate = formatLocaleDate(currentDate);

      const element = (
        <div className="d-flex justify-content-center align-items-center flex-column text-light">
          <h1 className="display-4 mb-5 mt-5 fw-bold">Поточний час:</h1>
          <div className="d-flex flex-row d-grid gap-3 ">
            <h2 className="lead fs-1 fst-italic">
              {currentDate.toLocaleTimeString()}
            </h2>
            <h2 className="lead fs-1 fst-italic">{formattedDate}</h2>
            <h2 className="lead fs-1 mb-5 fst-italic">
              {currentDate.getFullYear()}
            </h2>
          </div>
          <WeatherWidget />
        </div>
      );
      setRootElement(element);
    };

    const intervalId = setInterval(tick, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [rootElement, setRootElement] = useState(null);

  return <div>{rootElement}</div>;
}

export default App;
