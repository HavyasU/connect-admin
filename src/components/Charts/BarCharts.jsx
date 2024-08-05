import { Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const BarCharts = ({ data }) => {
  // const data = [
  //   {
  //     Month: "January",
  //     user: 10,
  //     posts: 20,
  //   },
  //   {
  //     Month: "February",
  //     user: 95,
  //     posts: 28,
  //   },
  //   {
  //     Month: "March",
  //     user: 40,
  //     posts: 90,
  //   },
  //   {
  //     Month: "April",
  //     user: 10,
  //     posts: 204,
  //   },
  //   {
  //     Month: "May",
  //     user: 58,
  //     posts: 204,
  //   },
  //   {
  //     Month: "May",
  //     user: 58,
  //     posts: 204,
  //   },
  //   {
  //     Month: "May",
  //     user: 58,
  //     posts: 204,
  //   },
  // ];
  return (
    <Box className="pr-8" width={"100%"} height={"100%"}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Legend />
          <Bar
            dataKey="users"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarCharts;
