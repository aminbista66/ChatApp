import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { Home, Signin, Register, Account } from './pages';
import { Route, Routes, Router } from 'react-router-dom';
import { PrivateRoute } from './components';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/login/" element={<Signin />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/register/" element={<Register />} />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
