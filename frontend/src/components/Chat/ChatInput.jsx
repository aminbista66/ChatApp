import {
  Box,
  Button,
  Input,
  Flex,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useState } from 'react';
import { HiPaperAirplane } from 'react-icons/hi';
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from 'react-icons/md';

export const ChatInput = ({socket}) => {
  // const [emoji, setEmoji] = useState('');
  const [text, setText] = useState('');

  // const handleEmojiClick = emoji => {
  //   setEmoji(prev => prev + emoji);
  // };

  // const handleInputChange = text => {
  //   setText(prev => prev + text);
  // };

  const sendMessage = (message) => {
    socket.send(JSON.stringify({sender: JSON.parse(localStorage.getItem("user_data")).username, message: message }))
  }

  return (
    <Box h={'8%'} padding={{ lg: '20px' }} position={"sticky"} bottom={"0"} background="transparent">
      <Flex gap={'30px'}>
        <Input
          placeholder="start chatting..."
          variant={'filled'}
          onChange={e => setText(e.target.value)}
        />

        <Flex gap={'5px'}>
          {/* <Menu>
            <MenuButton as={Button}>
              <MdEmojiEmotions size={20} />
            </MenuButton>
            <MenuList padding={0} outline={'none'} border={'none'}> */}
              {/* <EmojiPicker onEmojiClick={e => setText(prev => prev + e.emoji)} /> */}
            {/* </MenuList>
          </Menu> */}
          <Button
            backgroundColor={'#1A2027'}
            color="gray.200"
            _hover={{ backgroundColor: 'gray.400', color: 'black' }}
            rightIcon={<HiPaperAirplane />}
            display="flex"
            alignItems={'center'}
            onClick = {() => sendMessage(text)}
          >
            Send
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
