import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  UserCredential,
  signInWithPopup,
  ProviderId,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { doc, getDoc, initializeFirestore } from 'firebase/firestore';
import { firebaseApp } from '@app/api';
import { TAuthContext } from './types';

type TProps = {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
};

export const ALLOWED_OAUTH_PROVIDERS: Record<string, any> = {
  [ProviderId.GOOGLE]: new GoogleAuthProvider(),
  [ProviderId.GITHUB]: new GithubAuthProvider(),
};

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  loginWithOauthPopup: () => Promise.reject({}),
  logOut: () => void 0,
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

export const isUserAdmin = async (firebaseApp: FirebaseApp) => {
  const db = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
  });
  return await getDoc(doc(db, '/internal/auth'));
};

export const AuthContextProvider: FC<TProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<TAuthContext['isAuthenticated']>(null);
  const [user, setUser] = useState<any>(null);
  const [auth] = useState(getAuth(props.firebaseApp));

  useEffect(() => {
    if (!auth) {
      return;
    }
    auth.setPersistence(browserLocalPersistence);
    auth.languageCode = 'ru';

    auth.onAuthStateChanged((user) => {
      // console.log('auth changed', user);
      if (user) {
        isUserAdmin(firebaseApp)
          .then(() => {
            setUser(user);
            setIsAuthenticated(true);
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
            setUser(null);
            setIsAuthenticated(false);
            signOut(auth);
          });
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  const processLogin = (loginPromise: Promise<UserCredential>) => {
    setUser(null);
    setIsAuthenticated(null);
    return loginPromise
      .then((result) => {
        // log success auth
        return result;
      })
      .catch((error) => {
        // log auth errors
        throw error;
      });
  };

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return processLogin(signInWithEmailAndPassword(auth, email, password));
  };

  const loginWithOauthPopup = (providerId: string) => {
    return processLogin(signInWithPopup(auth, ALLOWED_OAUTH_PROVIDERS[providerId]));
  };

  const logOut = () => signOut(auth);

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithEmailAndPassword,
        loginWithOauthPopup,
        logOut,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
