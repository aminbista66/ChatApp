import { useEffect } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import { Signin } from "./pages"


export const App = () => {

  return (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="login/" element={<Signin/>}/>
    </Routes>
  </ChakraProvider>
)};
