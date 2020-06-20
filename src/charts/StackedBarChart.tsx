import React from 'react';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

interface Props {
   data: {name: string, value: number}[];
}

function StackedBarChart(props: Props) {
   return (
      <ResponsiveContainer width={'100%'} height={300}>
         <BarChart data={props.data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" />
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey='value' stackId="a" fill="#8884d8" />
         </BarChart>
      </ResponsiveContainer>
   );
}

export default StackedBarChart;