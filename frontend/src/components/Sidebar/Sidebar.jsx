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
import { useGlobalUserContext } from '../../context/UserContext';
import { ProfileCard } from '../Profile/ProfileCard';
import { BiLogOut } from 'react-icons/bi';
import { useGlobalAuthContext } from '../../context/AuthContext';

export const Sidebar = () => {
  const { logout } = useGlobalAuthContext();
  const navigate = useNavigate();
  const [islg] = useMediaQuery('(min-width: 1280px)');
  const [inbox, setInbox] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inboxProfile, setInboxProfile] = useState(true);

  useEffect(() => {
    request({
      url: 'api/fetch-inbox',
      method: 'get',
    })
      .then(res => setInbox(res.data.inboxes))
      .catch(err =>
        err.response.status === 500 ? navigate('/login') : console.log(err)
      );
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
      >
        <Box padding={{ lg: '10px', sm: '8px' }}>
          <Image
            boxSize={{ lg: '64px', sm: '52px' }}
            objectFit="cover"
            src={logo}
            alt="Dan Abramov"
            borderRadius={'50%'}
          />
        </Box>
        <Box
          w={{ lg: '300px', sm: '52px' }}
          paddingLeft={{ lg: '10PX', sm: '4px' }}
        >
          <InputGroup>
            <InputRightElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              placeholder="Search People"
              w={{ lg: 'full', sm: '52px' }}
              color="white"
            />
          </InputGroup>
        </Box>
        <Box
          w={{ lg: '300px', sm: '52px' }}
          padding={{ lg: '10px', sm: '4px' }}
          marginTop={'100px'}
          marginLeft={{ lg: '10px', sm: '4px' }}
          borderRadius={'10px'}
          _hover={{
            backgroundColor: 'gray.700',
            transition: '.1s ease',
          }}
        >
          <VStack>
            {console.log(inbox)}
            {inbox.map((item, i) => {
              return (
                <Flex alignItems={'center'} gap={'20px'} w={'full'} key={i}>
                  <Avatar
                    src={item.users[0].dp}
                    boxSize={'48px'}
                    borderRadius={'50%'}
                    objectFit="cover"
                    onClick={() => handleUserDetailFetch(item.users[0].doc_id)}
                    cursor={'pointer'}
                  >
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
                    >
                      {item.users[0].name}
                    </Text>
                  ) : (
                    <></>
                  )}
                </Flex>
              );
            })}
          </VStack>
        </Box>
        <Center
          style={{ position: 'fixed', bottom: '0' }}
          padding={{ lg: '0 0 20px 50px' }}
        >
          <Button
            aria-label=""
            variant={'ghost'}
            leftIcon={<BiLogOut size={'20'} />}
            color="white"
            backgroundColor="transparent"
            _hover={{ backgroundColor: 'gray.600' }}
            onClick={() => logout().then(res => navigate("/login"))}
          >
            {islg ? 'Logout' : ''}
          </Button>
        </Center>
      </Box>
    </>
  );
};
