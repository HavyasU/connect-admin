import { Box, Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const StatCards = ({ statistics }) => {
  return (
    <Box className="w-full ">
      <Flex
        className="w-full"
        wrap="wrap"
        justifyContent="center"
        alignItems={"center"}
        gap={4}
      >
        {statistics?.map((ele, index) => (
          <Card
            background={ele?.olor}
            key={index}
            boxShadow="md"
            className=" max-md:size-2/5 max-sm:px-5  max-sm:h-24 flex md:w-[15rem] items-center justify-center flex-col shadow-black shadow-lg"
          >
            <CardBody className="flex items-center justify-center flex-col max-md:gap-1 gap-2">
              <Heading size={"md"}>{ele.name}</Heading>
              <Heading size="lg">{ele.count}</Heading>
            </CardBody>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default StatCards;
