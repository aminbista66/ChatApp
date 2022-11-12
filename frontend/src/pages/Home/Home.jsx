import { useState } from "react";
import { Sidebar, Chat, Filler } from "../../components";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { useGlobalChatContext } from "../../context/ChatContext";

export const Home = () => {
  const {currentInboxID, showInbox} = useGlobalChatContext();


  return (
    <>
      <Flex h={"100vh"}>
        <Sidebar />
        {showInbox && currentInboxID !== "" ? <Chat /> : <Filler/>}
      </Flex>
    </>
  );
};
