import { User, UserCredential } from 'firebase/auth';

export type TAuthContext = {
  isAuthenticate: boolean | null;
  user: User | null;
  loginWithEmailAndPass: (email: string, password: string) => Promise<UserCredential>;
};
