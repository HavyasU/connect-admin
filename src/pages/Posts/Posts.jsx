import React, { useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import { fetchRequestCaller } from "../../utils";
import { BsSignNoLeftTurn } from "react-icons/bs";
import { Box } from "@chakra-ui/react";
import PostSearchBar from "../../components/PostSearchBar/PostSearchBar";

const Posts = ({ postsData, fetchPosts }) => {
  return (
    <Box className="flex justify-center items-center flex-col">
      <Box className="mt-2 mb-5">
        <PostSearchBar fetchPosts={fetchPosts} />
      </Box>
      <Box className="w-2/4 max-md:w-full  mx-auto">
        {postsData &&
          postsData.length > 0 &&
          postsData?.map((post) => {
            return <PostCard post={post} fetchPosts={fetchPosts} />;
          })}
      </Box>
    </Box>
  );
};

export default Posts;
