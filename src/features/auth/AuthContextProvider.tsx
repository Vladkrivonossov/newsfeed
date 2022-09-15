import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { TAuthContext, TLoginWithEmailAndPasswordResult } from './types';
import { FirebaseApp } from 'firebase/app';
import {
  getAuth,
  User,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { getDoc, getFirestore, doc } from 'firebase/firestore';

const authContext = createContext<TAuthContext>({
  isAuthenticate: null,
  user: null,
  loginWithEmailAndPass: () => Promise.reject({}),
  loginWithPopup: () => Promise.reject({}),
  logOut: () => undefined,
});

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

export const useAuth = (): TAuthContext => useContext(authContext);

const isUserAdmin = async (firebaseApp: FirebaseApp) => {
  const db = getFirestore(firebaseApp);
  return await getDoc(doc(db, '/internal/auth'));
};

interface Props {
  app: FirebaseApp;
  children: ReactNode;
}

export const AuthContextProvider: FC<Props> = ({ children, app }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<TAuthContext['isAuthenticate']>(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth] = useState(getAuth(app));

  const processLogin = (loginPromise: Promise<UserCredential>): Promise<TLoginWithEmailAndPasswordResult> => {
    setUser(null);
    setIsAuthenticate(null);
    return loginPromise
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(`login error: ${error.message}`);
        throw error;
      });
  };

  const loginWithEmailAndPass = (email: string, password: string) => {
    return processLogin(signInWithEmailAndPassword(auth, email, password));
  };

  const loginWithPopup = (provider: string) => {
    return processLogin(signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[provider]));
  };

  useEffect(() => {
    auth.setPersistence(browserLocalPersistence);

    auth.onAuthStateChanged((user) => {
      if (user) {
        isUserAdmin(app)
          .then(() => {
            setIsAuthenticate(true);
            setUser(user);
          })
          .catch(() => {
            logOut();
            setUser(null);
            setIsAuthenticate(false);
          });
      } else {
        setUser(null);
        setIsAuthenticate(false);
      }
    });
  }, [auth]);

  const logOut = () => signOut(auth);

  return (
    <authContext.Provider
      value={{
        isAuthenticate,
        user,
        loginWithEmailAndPass,
        loginWithPopup,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
