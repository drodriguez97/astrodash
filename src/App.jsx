import { useState, useEffect } from 'react'
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Card from './Components/Card';
import './App.css'
import List from './Components/List';
import HighLowGraph from './Components/HighLowGraph';
import CloudGraph from './Components/CloudGraph';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [currWeather, setCurrWeather] = useState({});
  const [pastWeather, setPastWeather] = useState([{}]);
  const  [inputs, setInputs] = useState({
    startDate: "2023-03-15",
    endDate: "2023-03-24",
    cloudCoverage: null
  }); 

  useEffect(() => {
    const getCurrWeather = async () => {
      const response = await fetch(`https://api.weatherbit.io/v2.0/current?&city=NY&country=US&key=${API_KEY}`)
      const json = await response.json()
      setCurrWeather(json.data[0]);
      
    }
    getCurrWeather().catch(console.error);
  },[])

  const handleChange = (event) => {
    const {name, value} = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="App">
      
      <div className='main'>
        <div className='feature-cards'>
          <Card 
            descr={currWeather.city_name}
            title={currWeather.ob_time}
          />
          <Card 
            descr={(currWeather.temp * 1.8 + 32).toFixed(0)  + "°F"}
            title={"☁️" +currWeather.clouds + "%"}
          />
          <Card 
            descr={currWeather.sunrise}
            title="sunrise"
          />
        </div>

        <div className='list-container'>
          <div className='filters'> 
            <label>
              Start Date<input
                type="date"
                name='startDate'
                onChange={handleChange}
              />
            </label>
            <label>
              End Date
              <input
                type="date"
                name='endDate'
                onChange={handleChange}
              />
            </label>  
            <label>
              Cloud Coverage
              <input
                type="range"
                min="0" 
                max="100"
                name='cloudCoverage'
                onChange={handleChange}
              />
            </label>
          </div>
          <table className='data-header'>
            <tbody>
              <tr>
                <td>Date</td>            
                <td>Low</td>
                <td>High</td>
                <td>Cloud Coverage</td>
                <td>Precipitation</td>
              </tr>  
            </tbody>       
          </table>

          <List 
            inputs={inputs}
            pastWeather={pastWeather}
            setPastWeather={setPastWeather}
          />
        </div>
        <div className='graph'>
            <h2>High/Low</h2>
            <HighLowGraph 
            pastWeather={pastWeather}/>

            <h2>Cloud Coverage</h2>
            <CloudGraph 
            pastWeather={pastWeather}/>
        </div>
      </div>
      
    </div>
  )
}

export default App
