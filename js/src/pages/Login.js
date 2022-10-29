import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { FirebaseAppContext } from '../contexts/FirebaseContext';
import { createNewUserIfNotExist } from '../utils/firestore';

export const Login = ({ setUser, user }) => {
  const firebaseApp = useContext(FirebaseAppContext);
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();
  useEffect(() => {
    if(user) { navigate("/") }
  })

  const handleLogin = async () => {
    const googleUserData = await LoginWithGoogle();
    if (googleUserData) {
      const createdDbUser = await createNewUserIfNotExist(db, googleUserData);
      setUser(createdDbUser)
    }
  }

  return (
    <div>
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}

const LoginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

    return { id: user.uid, name: user.displayName, email: user.email };
  } catch (err) {
    console.log("Failed to login");
  }
}