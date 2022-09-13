import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { TAuthContext } from './types';
import { FirebaseApp } from 'firebase/app';
import { getAuth, User, signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';

const authContext = createContext<TAuthContext>({
  isAuthenticate: null,
  user: null,
  loginWithEmailAndPass: () => Promise.reject({}),
});

export const useAuth = (): TAuthContext => useContext(authContext);

interface Props {
  app: FirebaseApp;
  children: ReactNode;
}

export const AuthContextProvider: FC<Props> = ({ children, app }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<TAuthContext['isAuthenticate']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(app));

  const loginWithEmailAndPass = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(`login error: ${error.message}`);
        throw error;
      });
  };

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);

    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticate(true);
        setUser(user);
      } else {
        setIsAuthenticate(false);
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <authContext.Provider
      value={{
        isAuthenticate,
        user,
        loginWithEmailAndPass,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
