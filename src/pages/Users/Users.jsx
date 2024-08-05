import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NoProfile } from "../../assets";
import { fetchRequestCaller } from "../../utils";
import { baseUrlForUploads } from "../../App";

const Users = ({ admin }) => {
  const [usersData, setUsersData] = useState([]);
  const fetchUsersData = async () => {
    let users = await fetchRequestCaller({
      method: "GET",
      url: "/admin/users",
    });
    setUsersData(users?.data);
  };

  useEffect(() => {
    fetchUsersData();
  }, [admin]);
  return (
    <Box className="overflow-auto m-0 p-0 mb-3">
      <Heading className="pl-3">Users</Heading>
      <Table align="center">
        <Thead>
          <Tr>
            <Th>Profile Photo</Th>
            <Th>First name</Th>
            <Th>Last name</Th>
            <Th>Profession</Th>
            <Th>Location</Th>
            <Th>Verified</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usersData?.map((user, ind) => {
            return (
              <Tr key={ind}>
                <Td>
                  <Box className="w-12 h-12 ml-5 rounded-full overflow-hidden flex juce items-center">
                    <img
                      src={
                        user?.profileUrl
                          ? `${baseUrlForUploads}/${user?.profileUrl}`
                          : NoProfile
                      }
                      alt=""
                    />
                  </Box>
                </Td>
                <Td>{user?.firstName ?? "-"}</Td>
                <Td>{user?.lastName ?? "-"}</Td>
                <Td>{user?.profession ?? "-"}</Td>
                <Td>{user?.location ?? "-"}</Td>
                <Td>{user.verified ? "Yes" : "No"}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Users;
