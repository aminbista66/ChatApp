import { createContext, useContext, useState, useEffect } from 'react';
import { request } from '../utils/api';

const UserContext = createContext('');

export default function UserProvider({ children }) {
  const [refreshInboxFetch, setRefreshInboxFetch] = useState(false);

  return <UserContext.Provider value={{refreshInboxFetch, setRefreshInboxFetch }}>{children}</UserContext.Provider>;
}

export function useGlobalUserContext() {
  return useContext(UserContext);
}
