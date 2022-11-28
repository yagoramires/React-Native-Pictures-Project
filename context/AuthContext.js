import { onAuthStateChanged } from 'firebase/auth';
import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscribe;
  }, [auth]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export function useAuthValue() {
  return useContext(AuthContext);
}
