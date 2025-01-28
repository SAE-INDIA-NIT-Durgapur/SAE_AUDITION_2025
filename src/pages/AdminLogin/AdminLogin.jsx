import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./AdminLogin.css";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("playmygames77@gmail.com"); // Added email state
  const [error, setError] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false); // To track OTP sent status
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const SUPER_USER = import.meta.env.VITE_SUPER_USER;
  const SUPER_PASS = import.meta.env.VITE_SUPER_PASS;
  const API_ENDPOINT_URL = import.meta.env.VITE_API_URL;
  // Function to handle sending OTP
  const handleSendOtp = async (e) => {

    e.preventDefault();
    if (username === SUPER_USER || password === SUPER_PASS) {
      navigate("/dashboard");
      return;
    }

    if (!email) {
      alert("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const send_otp_url = API_ENDPOINT_URL+"/api/send-otp/";
      const response = await axios.post(send_otp_url, {
        email: email, // Ensure email is passed dynamically
      });
      if (response.status === 200) {
        setIsOtpSent(true);
        // alert("OTP sent successfully to Admin email!");
      }
    } catch (error) {
      console.error("Error:", error.response || error);
      alert("Error sending OTP. Please try again!");
    } finally {
      setLoading(false); // Stop loading after request is complete
    }
  };

  // Function to handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, authenticate the user
      const login_url = API_ENDPOINT_URL+"/api/login/";
      const response = await axios.post(login_url, {
        username,
        password,
      });

      // Second, verify OTP
      const verify_otp_url = API_ENDPOINT_URL+"/api/verify-otp/";
      const response2 = await axios.post(
        verify_otp_url,
        {
          email: email, // Make sure to pass the email dynamically
          otp: otp,
        }
      );

      if (response.status === 200 && response2.status === 200) {
        navigate("/dashboard"); // Redirect on successful login and OTP verification
      } else {
        setError("Invalid OTP.");
      }
    } catch (err) {
      setError("Invalid credentials or OTP.");
    }
  };

  return (
    <div className="loginform">
      <div className="formcontain">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            <span
              style={{
                backgroundColor: "red",
                borderRadius: "1rem",
                color: "#fff",
                padding: "5px 10px",
              }}
            >
              Admin
            </span>{" "}
            <span style={{ color: "white" }}>Login</span>
          </label>

          <div style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faUser}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              type="text"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ paddingLeft: "35px" }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <FontAwesomeIcon
              icon={faLock}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: "35px" }}
            />
          </div>

          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button>
          {loading && <LoadingOverlay />}
          {isOtpSent && (
            <>
              <input
                placeholder="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </>
          )}

          {error && <p style={{ color: "red", fontSize: "1.5vw" }}>{error}</p>}
        </form>
      </div>
      <div className="w-1/2  h-screen align-center flex items-center justify-center admin-img">
       
        <img
          className="lg:w-[600px] lg:h-[600px]   "
          src="/Images/pngwing.com (7).png"
          alt=""
        />
      </div>
    </div>
  );
};

export default AdminLogin;