import React, { useContext } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Login.css'
import {ThemeContext} from "../contexts/theme";  

function Login() {
  let navigate = useNavigate();
  const [{theme}] = useContext(ThemeContext); 
  
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      navigate("/");
    });
  };

  return (
    <div className="loginPage" style={{backgroundColor: theme.textboxColor}}>
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" style={{backgroundColor: theme.backgroundColor, color: theme.color}} onClick={signInWithGoogle}>
        Sign in
      </button>
    </div>
  );
}

export default Login;