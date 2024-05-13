import { ReactNode } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Auth } from "./formTypes";
export type Theme = 'light' | 'dark';


export type LogOutFunction = () => void;

export type SingUpAndLoginFunction = {
  singUp: (auth: Auth) => void;
  login: (auth: Auth) => void;
  user: FirebaseUser | null;
  loading: boolean;
  logOut: LogOutFunction;
  role: number | null
};

export type AuthProviderProps = {
  children: ReactNode;
};
export type UserFirebaseOrNull = FirebaseUser | null;

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};