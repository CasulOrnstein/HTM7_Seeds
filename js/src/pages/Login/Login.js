import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import '../Login/Login.css';

import background from '../../images/abstract_background.png'
import logo from '../../images/logo-test.png'
import wood from '../../images/wood.png'

import { FirebaseAppContext } from '../../contexts/FirebaseContext';
import { createNewUserIfNotExist } from '../../utils/firestore';

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
  <div className="login-page-container" style={{ backgroundImage: `url(${background})`}}>
    {/* <h1 className="main-title">Sowing is growing</h1> */}
    <div className="main-title">
      <img src={logo} />
    </div >
    <LoginButton handleLogin={handleLogin} />
  </div>)
}

const LoginButton = ({ handleLogin }) => {
  return (
    <button className="google-btn" onClick={handleLogin}>
      <img className="google-icon" alt="Google logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
      Login with Google
    </button>
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