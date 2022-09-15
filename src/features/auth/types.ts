import { User, UserCredential } from 'firebase/auth';

export type TLoginWithEmailAndPasswordResult = UserCredential;

export type TAuthContext = {
  isAuthenticate: boolean | null;
  user: User | null;
  loginWithEmailAndPass: (email: string, password: string) => Promise<TLoginWithEmailAndPasswordResult>;
  logOut: () => void;
  loginWithPopup: (provider: string) => Promise<TLoginWithEmailAndPasswordResult>;
};
