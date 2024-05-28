import { ReactNode } from "react";
import { Auth } from "./formTypes";
import { User as FirebaseUser } from "firebase/auth";

export type LogOutFunction = () => void;
export type SingUpAndLoginFunction = {
  singUp: (auth: Auth) => void;
  login: (auth: Auth) => void;
  user: FirebaseUser | null;
  loading: boolean;
  logOut: LogOutFunction;
};
export type AuthProviderProps = {
  children: ReactNode;
};
