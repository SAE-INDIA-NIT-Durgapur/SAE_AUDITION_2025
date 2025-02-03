import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // To track authentication status
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // If no token is found, redirect to login page
        navigate("/adminLogin");
        return;
      }

      try {
        // Send a GET request to the Django backend to validate the token
        const response = await axios.get("http://localhost:8000/api/validate-token/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Token is valid, allow access to the protected content
          setIsAuthenticated(true);
        }
      } catch (error) {
        // If token validation fails, redirect to login page
        setIsAuthenticated(false);
        navigate("/adminLogin");
      }
    };

    validateToken();
  }, [navigate]);

  if (isAuthenticated === null) {
    // Show a loading state while the token validation is happening
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;  // Render children (protected content) if authenticated
};

export default ProtectedRoute;
