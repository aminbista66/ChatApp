import React from 'react';
import {
  Flex,
  Image,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

export function ProfileCard({ data }) {
  let boxBg = useColorModeValue('white !important', '#111c44 !important');
  let mainText = useColorModeValue('gray.800', 'white');
  let secondaryText = useColorModeValue('gray.400', 'gray.400');
  

  return (
    <Flex
      borderRadius="20px"
      bg={boxBg}
      p="20px"
      h="345px"
      w={{ base: '315px', md: '345px' }}
      alignItems="center"
      direction="column"
    >
      <Image
        src={
          data.cover_picture == ''
            ? 'https://i.ibb.co/xmP2pS6/Profile.png'
            : data.cover_picture
        }
        maxW="100%"
        borderRadius="20px"
      />
      <Flex flexDirection="column" mb="30px">
        <Image
          src={
            data.display_picture == ''
              ? 'https://www.pngkey.com/png/detail/282-2820067_taste-testing-at-baskin-robbins-empty-profile-picture.png'
              : data.display_picture
          }
          border="5px solid red"
          mx="auto"
          borderColor={boxBg}
          width="68px"
          height="68px"
          mt="-38px"
          borderRadius="50%"
          objectFit={'cover'}
        />
        <Text
          fontWeight="600"
          color={mainText}
          textAlign="center"
          fontSize="xl"
        >
          {data.first_name} {data.last_name}
        </Text>
        <Text
          color={secondaryText}
          textAlign="center"
          fontSize="sm"
          fontWeight="500"
        >
          @{data.username}
        </Text>
      </Flex>
      <Flex gap={"10px"} alignItems={"center"}>
        <EmailIcon color={"gray.500"} />
        <Text
          color={"gray.500"}
          textAlign="center"
          fontSize="sm"
          fontWeight="500"
        >
          {data.email}
        </Text>
      </Flex>
      <Flex justify="space-between" w="100%" px="36px"></Flex>
    </Flex>
  );
}
