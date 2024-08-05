import { Box } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { CustomButton, TextInput } from "../elementComponents";

const PostSearchBar = ({ fetchPosts }) => {
  const { register, handleSubmit } = useForm();
  const handleSearch = async (data) => {
    await fetchPosts(data.search);
  };
  return (
    <Box>
      <form
        action="#"
        className="hidden md:flex items-center justify-center "
        onChange={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search.."
          styles=" w-[18rem] lg:w-[38rem] rounded-l-full  h-full border border-black"
          register={register("search")}
        />
        <CustomButton
          title={"Search"}
          type={"Submit"}
          onClick={handleSubmit(handleSearch)}
          containerStyles={`bg-[#0444a4]   text-white px-6 min-h-[3.2rem]    rounded-r-full`}
        />
      </form>
    </Box>
  );
};

export default PostSearchBar;
