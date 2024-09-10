import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Chart = () => {
    const data = [
        {
            id: 1,
            name: 'Assignment 1',
            marks: 60,
        },
        {
            id: 2,
            name: 'Assignment 2',
            marks: 60,
        },
        {
            id: 3,
            name: 'Assignment 3',
            marks: 57,
        },
        {
            id: 4,
            name: 'Assignment 4',
            marks: 60,
        },
        {
            id: 5,
            name: 'Assignment 5',
            marks: 60,
        },
        {
            id: 6,
            name: 'Assignment 6',
            marks: 60,
        },
        {
            id: 7,
            name: 'Assignment 7',
            marks: 60,
        },
    ];
    return (
        <ResponsiveContainer width="100%" height={600}>

            <AreaChart
                width={500}
                height={200}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="50%" stopColor="#7E90FE" stopOpacity={1} />
                        <stop offset="95%" stopColor="#9873FF" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area connectNulls type="monotone" dataKey="marks" stroke="#8884d8" fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default Chart;