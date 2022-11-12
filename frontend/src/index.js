import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import UserProvider from './context/UserContext';
import { ChatProvider } from './context/ChatContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
