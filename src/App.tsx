
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faSnowflake, faTint} from '@fortawesome/free-solid-svg-icons';

interface WeatherData {
  main: {
    temp:number;
    feels_like: number;
    humidity:number;
  };
  name: string;
  wind: {
    speed:number;
  };
  weather: {
    main: string;
  }[];
}

function App() {
  const [data, setData] = useState<WeatherData>({
    name: '',
    main: { temp: 273, humidity: 0, feels_like: 273},
    wind:{speed:0},
    weather: [{main: ''}]
  });
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4f73519f3591a1eb90c44ec7e71aadc8`;

  const searchLocation = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const response = await axios.get(url);
      setData(response.data);
      setLocation('');
    }
  };
  const getIcon = (weatherCondition: string): JSX.Element => {
    switch (weatherCondition) {
      case 'Clear':
        return <FontAwesomeIcon icon={faSun} />;
      case 'Clouds':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'Snow':
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        return <FontAwesomeIcon icon={faTint} />;
      default:
        return <FontAwesomeIcon icon={faSun} />;
    }
  };

  return (
    <div className="app">
      <div className="container">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchLocation}
          placeholder=" Enter Location"
          type="text"
        />
      </div>
        <div className="top">
          <div className="location">
            <p>
              <span className='icon'>
                {data.weather.length > 0 && getIcon(data.weather[0].main)}
              </span>
              {data.name}
            </p>
          </div>
          <div className="temp">
            <h1>
              {Math.round((data.main.temp ?? 0) - 273.15)}°C
            </h1>
          </div>
          <div className="description">
            <span className='icon'>
              {data.weather.length > 0 && getIcon(data.weather[0].main)}
            </span>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{Math.round((data.main.feels_like ?? 0) - 273.15)}°C</p>
            <i>Hissedilen Sıcaklık</i>
          </div>
          <div className="humidity">
            <p className="bold">{data.main.humidity}%</p>
            <i>Nem</i>
          </div>
          <div className="wind">
            <p className="bold">{Math.round((data.wind.speed ?? 0) * 3.6)} km/h</p>
            <i>Rüzgar Hızı</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
