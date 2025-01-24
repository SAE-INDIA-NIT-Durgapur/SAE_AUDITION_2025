import React, { useState } from 'react'
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import "./GoogleAuth.css";
import ai from "/GIF/ai.gif";
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from "../context/UserContext";

function GoogleAuth() {

// const [email, setEmail] = useState("");
const navigate = useNavigate();
const [isGoogleAuth, setIsGoogleAuth] = useState(false);
const { user, setUser } = React.useContext(UserDataContext);


const handleGoogleLogin = (credentialResponse) => {
  try {
    const decoded = jwtDecode(credentialResponse.credential);
    // setEmail(decoded.email);
    setUser({email: decoded.email });
    localStorage.setItem("email", decoded.email);
    setIsGoogleAuth(true);
    
    // console.log("Google User:", decoded);
  } catch (error) {
    console.error("Error decoding Google token:", error);
  }
    navigate("/home");

};

  return (
    <div className="gcontain">
      <img id="gif" src={ai} alt="A cool GIF" />
      <div className="gcontent">
        
        <div className="l">
          <a>
            <img
              src="https://swarajjaiswal.github.io/saeevents/logo.png"
              alt="Logo"
              className="logo transformed-logo"
            />
          </a>
        </div>
        <div className="g-auth">
          <h1>
            Please <span style={{ color: "#05e641" }}>Sign</span>-in
          </h1>
          <div className="google-login" style={{ width: "20%" }}>
            <GoogleLogin
            //   ref={googleButtonRef}
              onSuccess={handleGoogleLogin}
              onError={() => {
                console.log("Google Login Failed");
              }}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default GoogleAuth
