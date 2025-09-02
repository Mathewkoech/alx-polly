import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Option A', votes: 400 },
  { name: 'Option B', votes: 300 },
  { name: 'Option C', votes: 200 },
];

export default function PollResultChart() {
  return (
    <div>
      <h2>Poll Results</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="votes" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
