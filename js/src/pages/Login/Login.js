import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import '../Login/Login.css';

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
  <div className="login-page-container">
    <h1>Sowing is growing</h1>
    <img className="page-logo" alt="page logo" src="https://cdn.discordapp.com/attachments/352217625193086986/1035923267673923675/sunflower.png"/>
    <div class="login-container">
      <h2>Login with Google</h2>
        <button className="google-btn" onClick={handleLogin}>
        <img class="google-icon" alt="Google logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
          Login
        </button>
    </div>
  </div>)
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