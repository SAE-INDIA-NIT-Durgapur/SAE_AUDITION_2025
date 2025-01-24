import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        // Redirect to dashboard
        navigate("/dashboard"); // Use navigate() instead of history.push
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="loginform">
      <div className="formcontain">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            {" "}
            <span
              style={{
                backgroundColor: "#4bed15",
                color: "#fff",
                padding: "5px 10px",
              }}
            >
              Admin
            </span>{" "}
            <span>Login</span>
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
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          {error && <p style={{ color: "red", fontSize: "1.5vw" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
