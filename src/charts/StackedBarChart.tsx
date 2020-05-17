import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Point} from 'recharts';

interface BarSection {
   id: string;
   value: number;
}

interface BarData {
   name: string;
   value: number;
}

const data: BarData[] = [
   {name: 'Month 1', value: 500 },
   {name: 'Month 2', value: 450 },
   {name: 'Month 3', value: 370 },
   {name: 'Month 4', value: 250 },
   {name: 'Month 5', value: 120 },
   {name: 'Month 6', value: 10 },
];

function StackedBarChart() {
   return (
      <ResponsiveContainer width={'100%'} height={300}>
         <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey='value' stackId="a" fill="#8884d8" />
         </BarChart>
      </ResponsiveContainer>
   );
}

export default StackedBarChart;