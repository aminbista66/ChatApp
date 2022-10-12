import { FC, useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  InputRightElement,
  IconButton,
  InputGroup,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../components";
import { ArrowBackIcon, ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

import { UserCredential } from "../../utils/types";
import { login } from "../../utils/api/auth";
import { useNavigate } from "react-router-dom";


export const Signin: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserCredential>({
    username: "",
    password: "",
  });



  return (
    <VStack align="stretch" bgColor={useColorModeValue("gray.50", "gray.800")}>
      <Flex minH={"20vh"} padding={"10px"} justify={"space-between"}>
        <Button variant={"ghost"} aria-label="" leftIcon={<ArrowBackIcon />}>
          Home
        </Button>
        <ColorModeSwitcher />
      </Flex>
      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  onClick={() => {
                    login(formData);
                    navigate("/");
                  }}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </VStack>
  );
};
