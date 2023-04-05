import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CloudGraph({pastWeather}) {
    return (
        <div>
            <BarChart
                width={500}
                height={300}
                data={pastWeather}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >

                <Bar dataKey="clouds" fill="#8884d8" />

                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <XAxis dataKey="datetime" />
                <YAxis />
                <Tooltip />
            </BarChart>
        </div>
    )
}
