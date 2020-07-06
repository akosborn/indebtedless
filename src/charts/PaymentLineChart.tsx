import React from 'react';
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {keys, omit} from 'lodash';

const colors: string[] = [
   '#003f5c',
   '#2f4b7c',
   '#665191',
   '#a05195',
   '#d45087',
   '#f95d6a',
   '#ff7c43',
   '#ffa600'
];

interface Props {
   data: { [k: string]: number | string }[];
}

function PaymentLineChart(props: Props) {
   const lines: string[] = keys(omit(props.data[0], ['name'])) || [];

   return (
      <ResponsiveContainer width={'100%'} height={300}>
         <LineChart data={props.data}>
            <XAxis dataKey="name" axisLine={false}/>
            <YAxis axisLine={false}/>
            <Tooltip/>
            <Legend />
            {lines.map((l, i) =>
               <Line type="monotone" dataKey={l} color={colors[i % colors.length]} />
            )}
         </LineChart>
      </ResponsiveContainer>
   );
}

export default PaymentLineChart;