import React from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

interface BarSection {
   id: string;
   value: number;
}

interface BarData {
   name: string;
   interestBar: BarSection;
   principal: BarSection;
}

const data: BarData[] = [
   {name: 'Month 1', interestBar: { id: 'Interest', value: 300 }, principal: { id: 'Principal', value: 500 }},
   {name: 'Month 1', interestBar: { id: 'Interest', value: 200 }, principal: { id: 'Principal', value: 600 }},
   {name: 'Month 1', interestBar: { id: 'Interest', value: 100 }, principal: { id: 'Principal', value: 700 }},
   {name: 'Month 1', interestBar: { id: 'Interest', value: 0 }, principal: { id: 'Principal', value: 800 }},
];

function StackedAreaChart() {
   return (
      <ResponsiveContainer width={'100%'} height={300}>
         <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Area type='monotone' dataKey={v => v.interestBar.value} stackId="1" stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey={v => v.principal.value} stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            <Area type='monotone' dataKey={v => v.interestBar.value + v.principal.value} stackId="1" stroke='#ffc658' fill='#ffc658' />
         </AreaChart>
      </ResponsiveContainer>
   );
}

export default StackedAreaChart;