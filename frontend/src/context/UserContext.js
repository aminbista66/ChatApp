import { createContext, useContext, useState, useEffect } from 'react';
import { request } from '../utils/api';

const UserContext = createContext('');

export default function UserProvider({ children }) {
  const [docID, setDocID] = useState('');

  return <UserContext.Provider value={{docID, setDocID}}>{children}</UserContext.Provider>;
}

export function useGlobalUserContext() {
  return useContext(UserContext);
}
