import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const PieCharts = ({ data }) => {
  const COLORS = [
    "#a4de6c", // Light Lime
    "#8884d8", // Blue
    "#82ca9d", // Green
    "#ffbb28", // Gold
    "#ffc658", // Yellow
    "#ff8042", // Orange
    "#d28eff", // Purple
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="flex justify-start items-center flex-col"
    >
      <h2>Verification Status</h2>
      <PieChart width={"100%"} height={"100%"}>
        <Pie
          dataKey="count"
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={20}
          outerRadius={100}
          label
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
  s;
};

export default PieCharts;
