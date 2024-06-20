"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, User, Auth } from "firebase/auth";
import { auth } from "../services/firebase.js";

interface UserAuthContextProps {
  children: ReactNode;
}

interface AuthContextType {
  currentuser?: User | null;
  Login: (email: string, password: string) => Promise<void>;
  SignUp?: () => void;
  error?: any;
}

const userContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserAuthContextProvider");
  }
  return context;
}

const UserAuthContext = ({ children }: UserAuthContextProps) => {
    const [currentuser, setuser] = useState<User | null>(null);

    useEffect(() => {
      onAuthStateChanged(auth, user => {
        console.log(user)
        if (user) {
          setuser(user)
          console.log(`Logged in user: ${user.uid}`)
          if(window.location.pathname == "/login" || window.location.pathname == "/register"){
            window.location.href = "/landing"
          }
        }
      })
    })

    const Login = async (email: string, password: string) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log(user);
          window.location.href = "/";
        } catch (error) {
          console.log(error);
          alert(error)
          alert("Wrong Email or Password");
        }
    }

  const value: AuthContextType = {
    SignUp: undefined, 
    error: undefined, 
    currentuser,
    Login,
  }

  return (
    <userContext.Provider value={value}>{children}</userContext.Provider>
  )
}

export default UserAuthContext;
