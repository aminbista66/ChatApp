import { useEffect, useState } from "react"
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
import { Routes, Route, Navigate } from "react-router-dom"
import { Signin } from "./pages"
import { Home } from "./pages"
import { BASE_URL } from "./utils/urls"
import axios from "axios"

export const App = () => {
 const [status, setStatus] = useState<string>();
  useEffect(() => {
    axios.get(BASE_URL + "verify-token").then(res => setStatus(Object.keys(res.data)[0])).catch(err => console.log(err));
  }, [])
  console.log(status === "success")
  return (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="login/" element={<Signin/>}/>
      <Route path="/" element={
        status === "success" ? <Home/> : <Navigate to={"/login"} replace/>
      } />
    </Routes>


  </ChakraProvider>
)};
