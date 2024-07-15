import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import auth from "./firebase.init";

export let AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateInfo = (userName, image) => {
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: image,
    });
  };

  const logOut = () => {
    setUser(null);
    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  let authInfo = {
    user,
    loading,
    googleSignIn,
    logOut,
    signUp,
    updateInfo,
    signIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
