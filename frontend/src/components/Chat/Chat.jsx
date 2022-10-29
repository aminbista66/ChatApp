import { Stack, Text } from "@chakra-ui/react";
import { Header } from "./Header";

export const Chat = () => {
    return (
        <>
        <Stack>
        <Header data={{ name:"Amin Bista" }}/>
        <Text>Chat</Text>
        </Stack>
        </>
    )
}