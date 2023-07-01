import React from 'react';
import { AreaChart, Area, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
const data = [
  {name: 'Jan', Lectures: 0, pv: 2400, amt: 2400},
  {name: 'Feb', Lectures: 200, pv: 2400, amt: 2400},
  {name: 'Mar', Lectures: 100, pv: 2400, amt: 2400},
  {name: 'Apr', Lectures: 50, pv: 2400, amt: 2400},
  {name: 'May', Lectures: 230, pv: 2400, amt: 2400},
  {name: 'Jun', Lectures: 110, pv: 2400, amt: 2400},
  {name: 'Jul', Lectures: 0, pv: 2400, amt: 2400},
  {name: 'Aug', Lectures: 0, pv: 2400, amt: 2400},
  {name: 'Sep', Lectures: 400, pv: 2400, amt: 2400},
  {name: 'Oct', Lectures: 10, pv: 2400, amt: 2400},
  {name: 'Nov', Lectures: 0, pv: 2400, amt: 2400},
  {name: 'Dec', Lectures: 550, pv: 2400, amt: 2400},
];

export default function Chart({chartData}) {
  return (
    <ResponsiveContainer width={360} height={180}>
      <AreaChart data={chartData}
                 margin={{ top: 10, right: 30, left: 0, bottom: 0, fontSize: '10px' }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis tickCount={12} dataKey="name" />
        <YAxis />
        {/*<CartesianGrid strokeDasharray="3 3" />*/}
        <Tooltip />
        <Area type="monotone" dataKey="Lectures" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
