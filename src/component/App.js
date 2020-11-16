import './App.css';
import LocationSearch from './LocationSearch';
import axios from 'axios'
import React ,{useState} from 'react'



function App() {

  const [WeatherData , setWeather] =  useState({hasData:false});


    const callWeather =async (latlang)=>{
      let data = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat='+latlang.lat+'&lon='+latlang.lng+'&appid=a096b490c948c9a2b298be075fb31297&units=metric').catch(err=>{throw err})
      
      setWeather({
        hasData:true,
        name:data.data.name ,
        description:data.data.weather[0].description,
        visibility : data.data.visibility,
        Wind:data.data.wind.speed,
        Perssure:data.data.main.pressure,
        Humidity: data.data.main.humidity,
        temp:data.data.main.temp,
        feels_like:data.data.main.feels_like,
        Dew_point:data.data.main.temp_min
      })
      console.log(data.data);
      
    }
    const d = new Date()
      const view = WeatherData.hasData?(
      <div>
                  
                  <div className="temp">
                      <span>{WeatherData.name}</span>
                      <span>{`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}</span>
                      <h2>{Math.round(WeatherData.temp)}&#8451;</h2>
                      <h3>RealFeel {Math.round(WeatherData.feels_like)}&#8451;</h3>
                      <p className="description">
                        {WeatherData.description}
                      </p>
                  </div>

              <table>
                  <tbody>
                    <tr>
                      <th>Wind</th>
                      <td>{WeatherData.Wind}m/s SSE</td>
                    </tr>
                    <tr>

                      <th>Perssure</th>
                      <td>{WeatherData.Perssure}Mb</td>
                    </tr>

                    <tr>
                      <th>Humidity</th>
                      <td>{WeatherData.Humidity}%</td>
                    </tr>

                    <tr>
                      <th>Dew point</th>
                      <td>{Math.round(WeatherData.Dew_point)}&#8451;</td>
                    </tr>
                    <tr>

                      <th>Visibility</th>
                      <td>{WeatherData.visibility/1000}km</td>
                    </tr>

                  </tbody>
              </table> 
        </div>
        
        ):''



  return (
   
    <div className="App">
        <h1>Search City Weather</h1>
        <div className="Location-box box">
          <LocationSearch CallWeather= {callWeather}></LocationSearch>
        </div>


        <div className="resualt-box box">
         {view}
        </div>
    </div>
  );
}

export default App;
