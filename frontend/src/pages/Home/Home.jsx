import { useState } from "react";
import { Sidebar, Chat } from "../../components";
import { Flex, useDisclosure } from "@chakra-ui/react";

export const Home = () => {

  return (
    <>
      <Flex>
        <Sidebar />
        <Chat/>
      </Flex>
    </>
  );
};
