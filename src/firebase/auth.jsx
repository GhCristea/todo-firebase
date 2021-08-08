import { auth } from "./firebase";
import { createUserProfileDocument } from "./firestore";
import React from "react";
const { createContext, useContext, useEffect, useState } = React;

const defaultUser = {
  uid: "",
  email: "",
  displayName: "",
  photoURL: "",
};

const authContext = createContext({
  user: defaultUser,
  signin: (email = "", password = "") => {},
  signup: (email = "", password = "") => new Promise(),
  signout: () => {},
  sendPasswordResetEmail: (email = "") => true,
  confirmPasswordReset: (code = "", newPassword = "") => true,
});

// Wrapper component
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(defaultUser);

  const signin = async (email, password) => {
    const user = await _signin(email, password);
    setUser(user);
    return user;
  };

  const signup = async (email, password) => {
    const user = await _createUser(email, password);
    createUserProfileDocument(user);
    setUser(user);
    return user;
  };

  const signout = async () => {
    await auth.signOut();
    setUser(defaultUser);
  };

  const sendPasswordResetEmail = async (email) => {
    await auth.sendPasswordResetEmail(email);
    return true;
  };

  const confirmPasswordReset = async (code, password) => {
    await auth.confirmPasswordReset(code, password);
    return true;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("on auth state changed", "user: ", user);
      if (user) {
        setUser(user);
      } else {
        setUser(defaultUser);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

async function _createUser(email, password) {
  const { user } = await auth.createUserWithEmailAndPassword(email, password);
  return user;
}

async function _signin(email, password) {
  const { user } = await auth.signInWithEmailAndPassword(email, password);
  return user;
}

export async function _sendPasswordResetEmail(email) {
  auth.sendPasswordResetEmail(email);
}

/***********FIREBASE user types */
/*  type UserCredential = {
    additionalUserInfo?: firebase.auth.AdditionalUserInfo | null; 
    credential: firebase.auth.AuthCredential | null;//signInMethod: string;, toJSON(): Object;
    operationType?: string | null;
    user: firebase.User | null;
  };

type firebase.auth.AdditionalUserInfo = {
    isNewUser: boolean;
    profile: Object | null;
    providerId: string;
    username?: string | null | undefined;
}

  interface UserInfo {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
  }*/
