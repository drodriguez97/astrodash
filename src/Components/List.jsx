import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { MdInfo } from "react-icons/md"
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export default function List({inputs, pastWeather, setPastWeather}){

    useEffect(() => {
        const getWeatherHist = async () => {
        const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?city=NY&start_date=${inputs.startDate}&end_date=${inputs.endDate}&key=${API_KEY}`)
        const json = await response.json()
        setData(json.data);
        }
        getWeatherHist().catch(console.error);
    },[inputs])

    const setData = (data) => {
        const filterData = data.filter((item) => item.clouds <= inputs.cloudCoverage)

        !inputs.cloudCoverage ? setPastWeather(data) : setPastWeather(filterData); 
    }
    return (
        <table className="data-table">
            <tbody>
                { inputs && pastWeather.map((date, index) => 
                    <tr key={index}>
                        <td>
                            <Link
                                to={`/WeatherDetails/${date.datetime}`}
                            >
                                <span><MdInfo /></span> {date.datetime}
                            </Link>
                        </td>
                        <td>{(date.min_temp * 1.8 + 32).toFixed(0)  + " °F"}</td>
                        <td>{(date.max_temp * 1.8 + 32).toFixed(0) + " °F"}</td>
                        <td>{date.clouds + "%"}</td>
                        <td>{date.precip + "mm"}</td>
                        
                    </tr>
                ) 
                }
            </tbody>
            
            
        </table>
        
    )
}