import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Header } from "./Header";
import { ChatInput } from "./ChatInput";
import { useEffect, useState } from "react";
import { useGlobalChatContext } from "../../context/ChatContext";
import Cookies from "universal-cookie"
import { useGlobalUserContext } from "../../context/UserContext";

export const Chat = () => {
    const cookies = new Cookies();
    const { currentInboxID } = useGlobalChatContext();
    const [messages, setMessages] = useState([]);
    const {setRefreshInboxFetch} = useGlobalUserContext();
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${currentInboxID}/?token=${cookies.get("access_token")}`);

    useEffect(() => {
        socket.onopen = () => {
            setRefreshInboxFetch(prev => !prev)
        }
    },[])
    
    socket.onmessage = (event) => {
        console.log(JSON.parse(event.data))
    }

    return (
        <>
        <Box display={"flex"} flexDirection={"column"} >
        <Header data={{ name:"Amin Bista" }} flex={1}/>
        <Box flex={4} padding={"10px"} overflow={"scroll"}>
            <Stack>
            <Flex flexDirection={"row"}>
                <Box backgroundColor={"#DEF8D5"} padding={"10px"} borderRadius={"10px 10px 10px 0"} maxW={"30vw"}>
                    <Text>Hello</Text>
                </Box>
            </Flex>
            <Flex flexDirection={"row-reverse"}>
                <Box backgroundColor={"#D4E3F7"} padding={"10px"} borderRadius={"10px 10px 0 10px"} maxW={"30vw"}>
                <Text>Hi</Text>
                </Box>
            </Flex>
            </Stack>
        </Box>
        <ChatInput flex={1} socket={socket}/>
        </Box>
        </>
    )
}