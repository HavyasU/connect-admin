import { Box, Button, Card, CardBody, Flex, Heading, LinkBox } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidenav = () => {
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
        <div>
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
        </div>
    );
};

export default Sidenav;
