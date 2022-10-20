import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../App.css';
import { ImSpinner8 } from 'react-icons/im';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsThermometer,
} from 'react-icons/bs';

import { TbTemperatureCelsius } from 'react-icons/tb';
import Spinner from './Spinner';

const Main = () => {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Mumbai');
  const [inputValue, setInputValue] = useState('');
  const [loading,setLoading] = useState(false);

  const APIkey = '92e5dc73c8272810ca310c28fb83940f';
  useEffect(() => {

    // Weather Stack Api limit was excedded , in place i used openweather api .

    // const url = `http://api.weatherstack.com/current?access_key=57c22ec26cdfa3ac4bbe60bdc4729d65&query=${location}`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          setData(res.data);
          
          setLoading(false);
        }, 200);
      })

  }, [location]);


  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    if (inputValue !== '') {
      setLocation(inputValue);

    }
    setInputValue('')
  }


  let icon = <IoMdCloudy />;

  switch (data?.weather[0]?.main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy />;
      break;
    case 'Clear':
      icon = <IoMdSunny />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />;
      break;
    case 'Snow':
      icon = <IoMdSnow />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }


  const date = new Date();

  return (

    <>
    {
      loading ? <Spinner/>:
    <div className='container'>
      <div className='search-Box'>
        <div className='inputvalue'> <input type="text" onChange={handleChange} /></div>
        <button onClick={handleSubmit}> Search</button>
      </div>


      <div className='weather-data'>

        <div className='country'><h2>{data?.sys?.country}</h2></div>

       

        <div className='city'><h3> {data?.name}</h3></div>

        <div className='icon'>{icon}</div>
        <div className='date'>
          {date.getUTCDate()}/{date.getUTCMonth() + 1}/
          {date.getUTCFullYear()}
        </div>


        <div className='temp'><BsThermometer />Temp :{data?.main?.temp}<TbTemperatureCelsius /></div>
        <div className='hum'>Humidity :{data?.main?.humidity}</div>

        <div className='desc'>
          Description :   {data?.weather[0]?.description}
        </div>
      </div>

    </div>
    
 }
  </>
  )
  
}
export default Main;
