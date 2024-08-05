import { Box, Tooltip as ChakraTooltip } from "@chakra-ui/react";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    Month: "January",
    comments: 10,
    posts: 20,
  },
  {
    Month: "February",
    comments: 95,
    posts: 28,
  },
  {
    Month: "March",
    comments: 40,
    posts: 90,
  },
  {
    Month: "April",
    comments: 10,
    posts: 204,
  },
  {
    Month: "May",
    comments: 58,
    posts: 204,
  },
];

const PostChart = ({ data, lineDataKey, xaxisDatakey }) => {
  return (
    <Box className=" pr-10 min-w-[100%] h-[100%] ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line
            type="monotone"
            dataKey={lineDataKey}
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Legend className="text-2xl" />
          <Tooltip />
          <YAxis className="text-xs" />
          <XAxis dataKey={xaxisDatakey} className="text-xs" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PostChart;
