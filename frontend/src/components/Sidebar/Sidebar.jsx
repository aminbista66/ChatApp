import {
  IconButton,
  Box,
  VStack,
  HStack,
  Image,
  InputGroup,
  InputRightElement,
  Input,
  Text,
  Flex,
  useMediaQuery,
  AvatarBadge,
  Avatar,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import logo from '../../assets/logo.svg';
import { useState, useEffect } from 'react';
import { request } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useGlobalChatContext } from '../../context/ChatContext';
import { ProfileCard } from '../Profile/ProfileCard';
import { BiLogOut } from 'react-icons/bi';
import { useGlobalAuthContext } from '../../context/AuthContext';
import { useGlobalUserContext } from '../../context/UserContext';
import {AiOutlineUserAdd} from "react-icons/ai"

export const Sidebar = () => {
  const { logout, createInbox } = useGlobalAuthContext();
  const navigate = useNavigate();
  const [islg] = useMediaQuery('(min-width: 1280px)');
  const [inbox, setInbox] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inboxProfile, setInboxProfile] = useState(true);
  const { startChat, showInbox } = useGlobalChatContext();
  const { refreshInboxFetch, setRefreshInboxFetch } = useGlobalUserContext();

  useEffect(() => {
    request({
      url: 'api/fetch-inbox',
      method: 'get',
    })
      .then(res => setInbox(res.data.inboxes))
      .catch(err =>
        err.response.status === 500 ? navigate('/login') : console.log(err)
      );
  }, [refreshInboxFetch]);

  useEffect(() => {
    if (searchTerm !== '') {
      request({
        url: `api/search/?q=${searchTerm}`,
        method: 'post',
      }).then(res => setSearchResult(res.data.results));
    }
  }, [searchTerm]);

  const handleUserDetailFetch = doc_id => {
    onOpen();
    request({
      url: `api/user-detail/${doc_id}/`,
      method: 'get',
    })
      .then(res => setInboxProfile(res.data))
      .catch(err => console.log(err));
  };

  return (
    <>
      <Box
        backgroundColor={'#1A2027'}
        h="100vh"
        w={{ lg: '20rem', md: '4rem', sm: '4rem' }}
        overflow={'scroll'}
      >
        <Flex
          padding={{ lg: '10px', sm: '8px' }}
          alignItems="center"
          justifyContent={'space-between'}
        >
          {islg ? (
            <Image
              boxSize={{ lg: '64px', sm: '52px' }}
              objectFit="cover"
              src={logo}
              alt="Dan Abramov"
              borderRadius={'50%'}
            />
          ) : (
            <></>
          )}
          <Flex alignItems={'center'} gap={'10px'} paddingRight={'.75rem'}>
            {islg ? (
              <Text color={'white'} fontWeight={'semibold'}>
                {JSON.parse(localStorage.getItem('user_data')).first_name}{' '}
                {JSON.parse(localStorage.getItem('user_data')).last_name}
              </Text>
            ) : (
              <></>
            )}
            <Avatar
              src={''}
              boxSize={'48px'}
              borderRadius={'50%'}
              objectFit="cover"
              onClick={() => navigate('/account')}
              cursor={'pointer'}
            />
          </Flex>
        </Flex>
        <Box
        position={"relative"}
          w={{ lg: '300px', sm: '52px' }}
          paddingLeft={{ lg: '10PX', sm: '4px' }}
          paddingTop={{ lg: '10px' }}
        >
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              placeholder="Find People"
              w={{ lg: 'full', sm: '52px' }}
              color="white"
              onChange={e => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          {searchResult !== [] && searchTerm !== '' && islg ? (
            <VStack
            zIndex={"999"}
            position={"absolute"}
              spacing={4}
              backgroundColor={'gray'}
              padding={'10px'}
              w={'100%'}
              maxW={'100%'}
              maxH={'250px'}
              overflow={'scroll'}
              borderRadius={'0 0 10px 10px'}
            >
              {searchResult.map((item, i) => {
                console.log(item);
                return (
                  <Box
                    w={{ lg: '100%', sm: '52px' }}
                    padding={{ lg: '8px', sm: '4px' }}
                    borderRadius={'10px'}
                    _hover={{
                      backgroundColor: 'gray.700',
                      transition: '.1s ease',
                    }}
                    key={i}
                  >
                    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} h={"auto"}>
                    <Flex
                      alignItems={'center'}
                      gap={'10px'}
                      w={'full'}
                      h={'auto'}
                    >
                      <Avatar
                        src={item.display_picture}
                        boxSize={'32px'}
                        borderRadius={'50%'}
                        objectFit="cover"
                        onClick={() => handleUserDetailFetch(item._id.$oid)}
                        cursor={'pointer'}
                      ></Avatar>
                      <Modal
                        isCentered
                        onClose={onClose}
                        isOpen={isOpen}
                        motionPreset="slideInBottom"
                      >
                        <ModalOverlay />
                        <ModalContent>
                          <ModalCloseButton />
                          <Center>
                            <ProfileCard data={inboxProfile} />
                          </Center>
                        </ModalContent>
                      </Modal>
                      {islg ? (
                        <Text
                          color={'gray.100'}
                          fontSize={'14px'}
                          fontWeight={'semibold'}
                          cursor={'pointer'}
                        >
                          {item.first_name} {item.last_name}
                        </Text>
                      ) : (
                        <></>
                      )}
                     </Flex>
                     {item.username !==
                      JSON.parse(localStorage.getItem('user_data')).username ? (
                        <IconButton
                          // colorScheme="blue"
                          onClick={() => createInbox(item.username).then(res => {
                            setRefreshInboxFetch(prev => !prev);
                            setSearchTerm("");
                          })}
                          size={"sm"}
                          aria-label="Search database"
                          icon={<AiOutlineUserAdd size={20}/>}
                        />
                      ) : (
                        <></>
                      )}
                    </Flex>
                  </Box>
                );
              })}
            </VStack>
          ) : (
            <></>
          )}
        </Box>
        <VStack spacing={4}>
          {inbox.map((item, i) => {
            return (
              <Box
                w={{ lg: '300px', sm: '52px' }}
                padding={{ lg: '10px', sm: '4px' }}
                marginTop={'70px'}
                marginLeft={{ lg: '10px', sm: '4px' }}
                borderRadius={'10px'}
                _hover={{
                  backgroundColor: 'gray.700',
                  transition: '.1s ease',
                }}
                key={i}
              >
                <Flex
                  alignItems={'center'}
                  gap={'20px'}
                  w={'full'}
                  h={'auto'}
                  onClick={() => startChat(item._id.$oid)}
                >
                  <Avatar
                    src={item.users[0].dp}
                    boxSize={'48px'}
                    borderRadius={'50%'}
                    objectFit="cover"
                    onClick={() => handleUserDetailFetch(item.users[0].doc_id)}
                    cursor={'pointer'}
                  >
                    {console.log(item)}
                    {item.online_users.length ? (
                      <AvatarBadge boxSize=".85em" bg="green.400" />
                    ) : (
                      <></>
                    )}
                  </Avatar>
                  <Modal
                    isCentered
                    onClose={onClose}
                    isOpen={isOpen}
                    motionPreset="slideInBottom"
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalCloseButton />
                      <Center>
                        <ProfileCard data={inboxProfile} />
                      </Center>
                    </ModalContent>
                  </Modal>
                  {islg ? (
                    <Text
                      color={'gray.100'}
                      fontSize={'18px'}
                      fontWeight={'semibold'}
                      cursor={'pointer'}
                    >
                      {item.users[0].name}
                    </Text>
                  ) : (
                    <></>
                  )}
                </Flex>
              </Box>
            );
          })}
        </VStack>
        <Center
          style={{ position: 'fixed', bottom: '0' }}
          padding={{ lg: '10px 0' }}
          backgroundColor={'#1A2027'}
          w={{ lg: '20rem', md: '4rem', sm: '4rem' }}
        >
          <Button
            aria-label=""
            variant={'ghost'}
            leftIcon={<BiLogOut size={'20'} />}
            color="white"
            backgroundColor="transparent"
            _hover={{ backgroundColor: 'gray.600' }}
            onClick={() => logout().then(res => navigate('/login'))}
          >
            {islg ? 'Logout' : ''}
          </Button>
        </Center>
      </Box>
    </>
  );
};
