import { createContext, useContext, useState, useEffect } from 'react';
import { request } from '../utils/api';

const AuthContext = createContext('');


export default function AuthProvider({ children }) {
  const login = (data) => {
    return request({
      url: 'api/login/',
      method: 'post',
      data: data
    })
  }

  const createInbox = (username) => {
    return request({
      url: "api/create-inbox/",
      method: "post",
      data: {username: username}
    })
  }

  const logout = () => {
    console.log("INSIDE LOGOUT")
    return request({
      url: 'api/logout/',
      method: "get",
    })
  }

  return (
    <AuthContext.Provider value={{ login, createInbox, logout }}>{children}</AuthContext.Provider>
  );
}

export function useGlobalAuthContext() {
  return useContext(AuthContext);
}
