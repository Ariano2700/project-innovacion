import { createContext, useContext, useEffect, useState } from "react";
import { AuthProviderProps, LogOutFunction, SingUpAndLoginFunction } from "../domain/types/contextTypes";
import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth as authFirebase} from "../firebase/auth"
import { getRole } from "../hooks/getRole";
export const authContext = createContext<SingUpAndLoginFunction | undefined>(
    undefined
  );
  export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
      throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
  };
  
  export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] =
      useState<SingUpAndLoginFunction["loading"]>(true);
    const [role, setRole] = useState<number | null>(null);
  
    const singUp: SingUpAndLoginFunction["singUp"] = async (auth) => {
      const { email, password } = auth;
      try {
        const userCredential: UserCredential =
          await createUserWithEmailAndPassword(authFirebase, email, password);
        const uid = userCredential.user.uid;
        return uid;
      } catch (error: any) {
        throw new Error(error.message || "Error desconocido");
      }
    };
    const login: SingUpAndLoginFunction["login"] = async (auth) => {
      const { email, password } = auth;
      try {
        await signInWithEmailAndPassword(authFirebase, email, password);
      } catch (error: any) {
        throw new Error(error.message || "Error desconocido");
      }
    };
    const logOut: LogOutFunction = () => {
      signOut(authFirebase);
    };
  
    useEffect(() => {
      const unsuscribe = onAuthStateChanged(authFirebase, async (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        if (currentUser) {
          const role = await getRole({ uidUser: currentUser.uid });
          setRole(role);
        } else {
          setRole(null);
        }
      });
      return unsuscribe;
    }, []);
  
    return (
      <authContext.Provider
        value={{ singUp, login, logOut, loading, user, role }}
      >
        {children}
      </authContext.Provider>
    );
  };