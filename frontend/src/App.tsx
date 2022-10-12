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
import { PrivateRoute } from "./components/PrivateRoute"

export const App = () => {

  return (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="login/" element={<Signin/>}/>
      <Route path="/" element={
        <PrivateRoute>
          <Home/>
           </PrivateRoute>
      } />
    </Routes>


  </ChakraProvider>
)};
