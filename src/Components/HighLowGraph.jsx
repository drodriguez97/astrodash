import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label
} from "recharts";

export default function HighLowGraph({pastWeather}) {
    return (
        <div>
            <LineChart 
                width={800}
                height={300}
                data={pastWeather}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>

                <Line type="monotone" dataKey="max_temp" stroke="#8884d8" />

                <Line type="monotone" dataKey="min_temp" stroke="#D88884" />

                <CartesianGrid stroke="#ccc" strokeDasharray="4 4"/>

                <XAxis dataKey="datetime" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    )
}
