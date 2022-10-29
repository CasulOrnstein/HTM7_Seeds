import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const Login = ({ setUser, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(user) { navigate("/") }
  })

  const handleLogin = async () => {
    const receivedUserData = await LoginWithGoogle();
    if (receivedUserData) { setUser(receivedUserData) }
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

    return { name: user.displayName, email: user.email };
  } catch (err) {
    console.log("Failed to login");
  }
}