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
  HStack,

} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../components";
import { ArrowBackIcon, ViewOffIcon, ViewIcon, WarningIcon } from "@chakra-ui/icons";


import { useNavigate } from "react-router-dom";


export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [axiosPasswordError, setAxiosPasswordError] = useState("");

  useEffect(() => {
    if(formData.password != "" && formData.password2 !== ""){
        if(formData.password !== formData.password2){
            setPasswordError("password did not match.")
        }else{
            setPasswordError("")
        }
        
    }
  }, [formData.password, formData.password2])

  return (
    <VStack align="stretch" bgColor={useColorModeValue("gray.50", "gray.800")}>
      <Flex minH={"20vh"} padding={"10px"} justify={"space-between"}>
        <Button variant={"ghost"} aria-label="" leftIcon={<ArrowBackIcon /> } onClick={() => navigate("/")}>  
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
            <Heading fontSize={"4xl"}>Register your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
            

                <HStack spacing={2}>
                <FormControl id="firstName">
           
           <FormLabel>First Name</FormLabel>
           <Input
             type="text"
             onChange={(e) =>
               setFormData({ ...formData, first_name: e.target.value })
             }
           />
         </FormControl>
         <FormControl id="lastName">
           <FormLabel>Last Name</FormLabel>
           <Input
             type="text"
             onChange={(e) =>
               setFormData({ ...formData, last_name: e.target.value })
             }
           />
         </FormControl>
                </HStack>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />

              </FormControl>
              <FormControl id="email">
                <HStack spacing={8}>
                <FormLabel>Email</FormLabel>
                {emailError != "" && emailError != undefined ? <Text fontWeight={"bold"} color="red.500" fontSize={"16px"}> <WarningIcon/> {emailError}</Text>: <></>}
                </HStack>
                <Input
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
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
              {axiosPasswordError != "" && axiosPasswordError != undefined ? <Text color={"red.500"} fontSize="16px" fontWeight={"bold"}><WarningIcon/> {axiosPasswordError}</Text>: <></>}
              <FormControl id="confirm-password">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) =>
                      setFormData({ ...formData, password2: e.target.value })
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                    {passwordError != "" ? <Text color={"red.500"} fontSize="16px" fontWeight={"bold"}>{passwordError}</Text> : <></>}
                    
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  // onClick={() => {
                  //   register(formData).then(res => {
                  //       navigate("/login/");
                  //   }).catch(err => {
                  //       setEmailError(err.response.data.email);
                  //       setAxiosPasswordError(err.response.data.password);
                  //   })
                  // }}
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
