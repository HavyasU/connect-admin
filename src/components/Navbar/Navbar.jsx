import { Box, Card, CardBody, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { TbSocial } from "react-icons/tb";
import { IoClose, IoMenu } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";

const Navbar = ({ isMenuOpen, setIsMenuOpen, admin, setAdmin }) => {
  return (
    <Box className=" fixed px-3 z-50 mb-3 w-full left-0 ">
      <Card>
        <CardBody>
          <Flex
            justifyContent={"space-between"}
            className="flex justify-between items-center"
          >
            <Flex gap={2}>
              <Box className="p-2 text-2xl bg-blue-700 rounded-md">
                <TbSocial />
              </Box>
              <Heading>Connect</Heading>
            </Flex>
            {admin && (
              <Box
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <Heading>
                    <IoClose />
                  </Heading>
                ) : (
                  <Heading>
                    <IoMenu />
                  </Heading>
                )}
              </Box>
            )}
            <Box
              className="max-md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Box>
                {admin && (
                  <Heading
                    onClick={() => {
                      setAdmin(null);
                      localStorage.removeItem("connectadmin");
                      location.href = "/";
                    }}
                  >
                    <MdExitToApp />
                  </Heading>
                )}
              </Box>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Navbar;
