import { Box, Flex, Avatar, HStack, Text} from '@chakra-ui/react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

export const Header = ({ data }) => {
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
      <HStack spacing={"2"}>
        <Avatar
          src={""}
          boxSize={'40px'}
          borderRadius={'50%'}
          objectFit="cover"
        />
        <Text color={"#1A2027"} fontWeight="semi-bold">{data.name}</Text>
      </HStack>
      <Box>
        <BiDotsHorizontalRounded size={'20'} />
      </Box>
    </Flex>
  );
};
