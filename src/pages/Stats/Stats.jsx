import React, { useEffect, useState } from "react";
import StatCards from "../../components/StatCards/StatCards";
import PostChart from "../../components/Charts/PostChart";
import { Box } from "@chakra-ui/react";
import { PieChart } from "recharts";
import PieCharts from "../../components/Charts/PieCharts";
import BarCharts from "../../components/Charts/BarCharts";
import { fetchRequestCaller } from "../../utils";
const Stats = () => {
  const [statCounts, setStatCounts] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [postsStats, setPostsStats] = useState([]);
  const [commentStats, setCommentStats] = useState([]);
  const [verifiedStats, setVerifiedStats] = useState([]);
  const fetchStats = async () => {
    let res = await fetchRequestCaller({
      method: "GET",
      url: "/admin/analytics",
    });
    setStatCounts(res?.StatCounts);
    setUserStats(res?.usersByDate);
    setPostsStats(res?.postsByDate);
    setCommentStats(res?.commentsByDate);
    setVerifiedStats(res?.userVerificationCounts);
  };
  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="stats w-full ">
      <StatCards statistics={statCounts} />
      <Box className="flex flex-wrap justify-center max-md:flex-col ">
        <Box className=" mt-14 w-2/4 max-md:w-full h-64 flex justify-center items-center ">
          <BarCharts data={userStats} dataKey={"user"} />
        </Box>
        <Box
          className="mt-14
         w-2/4 h-64 max-md:w-full "
        >
          <PostChart
            data={postsStats}
            lineDataKey={"posts"}
            xaxisDatakey={"date"}
          />
        </Box>
        <Box
          className="mt-14
         w-2/4 h-64 max-md:w-full "
        >
          <PostChart
            data={commentStats}
            lineDataKey={"comments"}
            xaxisDatakey={"date"}
          />
        </Box>
        <Box
          className="mt-14
         w-2/4 h-64 max-md:w-full "
        >
          <PieCharts data={verifiedStats} />
        </Box>
      </Box>
    </div>
  );
};

export default Stats;
