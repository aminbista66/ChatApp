import {
  Flex,
  Avatar,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
} from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useGlobalChatContext } from '../../context/ChatContext';
import { MdClose } from 'react-icons/md';

export const Header = ({ data }) => {
  const { stopChat } = useGlobalChatContext();
  return (
    <Flex
      backgroundColor={'#F4F4F4'}
      w={{ lg: '83vw', sm: '92vw' }}
      h={'3.25em'}
      dropShadow={'lg'}
      alignItems="center"
      justifyContent={'space-between'}
      padding={'0 10px 0 10px'}
    >
      <HStack spacing={'2'}>
        <Avatar
          src={''}
          boxSize={'40px'}
          borderRadius={'50%'}
          objectFit="cover"
        />
        <Text color={'#1A2027'} fontWeight="semi-bold">
          {data.name}
        </Text>
      </HStack>
      <Flex>
        <Menu>
          <MenuButton as={Button}>
            <BiDotsHorizontalRounded size={'20'} />
          </MenuButton>
          <MenuList>
            <MenuItem>....</MenuItem>
          </MenuList>
        </Menu>
        <Button onClick={() => stopChat()}>
          <MdClose />
        </Button>
      </Flex>
    </Flex>
  );
};
