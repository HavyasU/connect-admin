import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  flexbox,
  Heading,
  LinkBox,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaUsers } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { TbSocial } from "react-icons/tb";
import { MdExitToApp } from "react-icons/md";
const Sidebar = ({ isMenuOpen, setIsMenuOpen, admin, setAdmin }) => {
  const sidebarItems = [
    {
      path: "/",
      icon: <FaChartBar />,
      title: "Statistics",
    },
    {
      path: "/users",
      icon: <FaUsers />,
      title: "Users",
    },
    {
      path: "/posts",
      icon: <BsFilePost />,
      title: "Posts",
    },
  ];
  return (
    <>
      <Box className=" fixed left-3  top-[6.5rem] min-h-[86vh] rounded shadow-lg shadow-gray-900  w-1/6   bg-secondaruy  max-md:hidden">
        <Flex wrap={true} direction={"column"} gap={2}>
          {sidebarItems?.map((ele) => {
            return (
              <Card className="w-full flex justify-center    items-start max-md:items-center">
                <CardBody className="w-full p">
                  <Heading
                    size={"md"}
                    className="w-full  flex justify-center items-center"
                  >
                    <Link className="w-full" to={ele.path}>
                      <Button
                        className="w-full  min-w-full inline-flex gap-2 max-md:gap-0 justify-center items-center"
                        boxShadow={"2"}
                        colorScheme="teal"
                        variant="outline"
                      >
                        <LinkBox className="flex justify-center items-center gap-2">
                          {ele?.icon}
                          <Text className="max-md:hidden">{ele?.title}</Text>
                        </LinkBox>
                      </Button>
                    </Link>
                  </Heading>
                </CardBody>
              </Card>
            );
          })}
        </Flex>
      </Box>
      <Box
        className={`md:hidden fixed top-3   bg-[#2d3748] w-1/2 h-[99vh] rounded-md transition-all duration-700 ease-in-out ${
          isMenuOpen ? "left-3" : "left-[-25rem]"
        }`}
      >
        <Box>
          <Flex direction={"column"} gap={2}>
            <Flex className="flex justify-center items-center flex-col" gap={2}>
              <Box className="px-3 py-2 mt-4 text-2xl bg-blue-700 rounded-md">
                <TbSocial />
              </Box>
              <Heading size={"lg"}>Dashboard</Heading>
            </Flex>
            {sidebarItems?.map((ele) => {
              return (
                <Card className="h-14">
                  <CardBody>
                    <Link className="w-full" to={ele.path}>
                      <Button
                        className="w-full min-w-full inline-flex gap-2 max-md:gap-0 justify-center items-center"
                        boxShadow={"2"}
                        colorScheme="teal"
                        variant="outline"
                      >
                        <LinkBox className="flex justify-center items-center gap-2">
                          {ele?.icon}
                          <Text className="">{ele?.title}</Text>
                        </LinkBox>
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              );
            })}
            <Card className="h-14">
              <CardBody>
                <Button
                  className="w-full font-bold min-w-full inline-flex gap-2 max-md:gap-0 justify-center items-center"
                  boxShadow={"2"}
                  colorScheme="teal"
                  variant="outline"
                >
                  <p
                    onClick={() => {
                      setAdmin(null);
                      localStorage.removeItem("connectadmin");
                      setIsMenuOpen(false);
                      location.reload();
                    }}
                    className="flex items-center gap-[10px]"
                  >
                    <MdExitToApp /> Logout
                  </p>
                </Button>
              </CardBody>
            </Card>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
