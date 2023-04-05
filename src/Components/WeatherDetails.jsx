import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherDetails = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    
    let start = params.date;
    let date = Number(start.slice(8)) + 1;
    let end = start.slice(0,8)+date; 
    
    useEffect(() => {
        const getWeatherHist = async () => {
        const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?city=NY&start_date=${params.date}&end_date=${end}&key=${API_KEY}`)
        const json = await response.json()
        setFullDetails(json);
        }
        getWeatherHist().catch(console.error);
    },[])

    return (
     <div>
        { fullDetails ? (
            <div className="weatherDetails">
                <h1>{fullDetails.city_name}</h1>
                <h2>Date: {fullDetails.data[0].datetime}</h2>
                <h4>Lat: {fullDetails.lat}, Lon: {fullDetails.lon}</h4>

                <table>
                    <tbody>
                        <tr>
                            <th>Average temperature</th>
                            <td>{(fullDetails.data[0].temp * 1.8 + 32).toFixed(0) } °F</td>
                        </tr>
                        <tr>
                            <th>Average cloud coverage</th>
                            <td>{fullDetails.data[0].clouds} %</td>
                        </tr>
                        <tr>
                            <th>High</th>
                            <td>{(fullDetails.data[0].max_temp* 1.8 + 32).toFixed(0)} °F</td>
                        </tr>
                        <tr>
                            <th>Low</th>
                            <td>{(fullDetails.data[0].min_temp* 1.8 + 32).toFixed(0)} °F</td>
                        </tr>
                        <tr>
                            <th>Average pressure</th>
                            <td>{fullDetails.data[0].pres} mb</td>
                        </tr>
                        <tr>
                            <th>Average wind speed</th>
                            <td>{fullDetails.data[0].wind_spd} m/s</td>
                        </tr>
                        <tr>
                            <th> Average relative humidity</th>
                            <td>{fullDetails.data[0].rh} %</td>
                        </tr>
                        <tr>
                            <th>Average solar radiation</th>
                            <td>{fullDetails.data[0].solar_rad} W/M^2</td>
                        </tr>
                        <tr>
                            <th>Accumulated precipitation</th>
                            <td>{fullDetails.data[0].precip_gpm} mm</td>
                        </tr>
                        
                    </tbody>
                </table>

            </div>

        ) : null }
     </div>
    );
};

export default WeatherDetails;