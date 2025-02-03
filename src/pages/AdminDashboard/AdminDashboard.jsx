import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
    const navigate = useNavigate();
    const [submittedData, setSubmittedData] = useState([]);
    const [Namequery, setNamequery] = useState('');
    const [Rollquery, setRollquery] = useState('');
    const [Domainquery, setDomainquery] = useState('');
    const [Genderquery, setGenderquery] = useState('');
    const API_ENDPOINT_URL = import.meta.env.VITE_API_URL;
    // const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const token = localStorage.getItem("accessToken");
    console.log("Access Token:", localStorage.getItem("accessToken"));
    console.log("Refresh Token:", localStorage.getItem("refreshToken"));

    useEffect(() => {
      const validateToken = async () => {
        const token = localStorage.getItem("accessToken");  // Retrieve the token from localStorage
  
        if (!token) {
          // If no token, navigate to the login page
          navigate("/adminLogin");
          return;
        }
  
        try {
          // Send a GET request to the Django backend to validate the token
          const validate_url = `${API_ENDPOINT_URL}api/validate-token/`;
          const response = await axios.get(validate_url, {
            headers: {
              Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
            },
          });
  
          if (response.status === 200) {
            // If the token is valid, stay on the current page
            console.log("Token is valid");
          }
        } catch (error) {
          // If the token is invalid or expired, navigate to the login page
          console.log("Invalid token");
          navigate("/adminLogin");
        }
      };
  
      validateToken();
    }, [navigate]);
    const refreshAccessToken = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${API_ENDPOINT_URL}api/token/refresh/`, { refresh: refreshToken });
    
        if (response.data.access) {
          localStorage.setItem("accessToken", response.data.access);
          return response.data.access; // Return new token
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT_URL}api/auditionform/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setSubmittedData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
            refreshAccessToken();
        }
    }
    };
  //   const refreshAccessToken = async () => {
  //     try {
  //         const refreshToken = localStorage.getItem('refreshToken');
  //         const response = await axios.post(`${API_ENDPOINT_URL}/api/token/refresh/`, { refresh: refreshToken });
  //         localStorage.setItem('accessToken', response.data.access);
  //         setToken(response.data.access);
  //         fetchData();
  //     } catch (error) {
  //         console.error('Error refreshing access token:', error);
  //     }
  // };
    const handledelete = async (id) => {
      try {
        await axios.delete(`${API_ENDPOINT_URL}api/delete/${id}/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
    } catch (error) {
        console.error('Error deleting record:', error);
    }

    }
    const handleNameSearch = async () => {
        try {
          const search_url = API_ENDPOINT_URL+"api/search/";
          const response = await axios.get(search_url, {
            params: { Namequery },
          });
          setSubmittedData(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
    const handleRollSearch = async () => {
        try {
          const search_url = API_ENDPOINT_URL+"api/search/";
          const response = await axios.get(search_url, {
            params: { Rollquery },
          });
          setSubmittedData(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
    const handleDomainSearch = async () => {
        try {
          const search_url = API_ENDPOINT_URL+"api/search/";
          const response = await axios.get(search_url, {
            params: { Domainquery },
          });
          setSubmittedData(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
    const handleGenderSearch = async () => {
        try {
          const search_url = API_ENDPOINT_URL+"api/search/";
          const response = await axios.get(search_url, {
            params: { Genderquery },
          });
          setSubmittedData(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
      const handleSheet = async (e) => {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyaFIGIm4alJE8yyZXwcf3LF8drgvNZm6VqvGoYsLJdfvftP_dY5CWfy7w3yXEEYK44/exec'; // Your Google Apps Script URL
        const sheetId = "1QKNFPfP62DtR8DNcm336kNi5D6EAGBQ9LqNZoQ4n7XI";  // Your Google Sheet ID
      
        try {
          // Loop through each object in submittedData
          for (const entry of submittedData) {
            console.log("Entry:", entry); // Log the entry to see its structure
      
            // Check if 'entry' is a valid object and contains the necessary properties
            if (entry) {
              const { name, gender, email, phone, roll} = entry; // Access properties of the object
      
              const formDataSubset = new URLSearchParams();
              formDataSubset.append('name', name);
              formDataSubset.append('email', email);
              formDataSubset.append('roll', roll);
              formDataSubset.append('gender', gender);
              formDataSubset.append('phone', phone);
      
              // Send the data to Google Sheets
              const response = await fetch(scriptURL, {
                method: 'POST',
                body: formDataSubset,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              });
      
              // Check if the response is OK
              if (!response.ok) {
                throw new Error('Error sending data to Google Sheets');
              }
            } else {
              console.error("Entry is invalid:", entry); // Log if entry is missing expected properties
            }
          }
      
          // After data is submitted, trigger the sheet download
          // const downloadUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;  // Link to download the sheet in xlsx format
          // window.location.href = downloadUrl; // Redirect to download the sheet
      
          alert("Data successfully sent to the sheet!");
      
        } catch (error) {
          console.error("Error submitting form:", error);
          alert("Error submitting form to sheet.");
        }
      }
      

    React.useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='dashboardcontainer'>
            <div className="dashhead">
                {/* <img style={{width: "10%",height: "auto"}} src="https://swarajjaiswal.github.io/saeevents/logo.png" alt="Logo" /> */}
                <p style={{color:"#fff"}}>welcome to <span style={{color:"#1ced31", fontWeight:"bolder"}} >admin</span> panel</p>
            </div>
            <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          navigate("/adminLogin");
        }}
      >
        Logout
      </button>
            <div className="searchbars">
              
                <div className="search">
                    <input
                        type="text"
                        placeholder="Filter by name"
                        value={Namequery}
                        onChange={(e) => setNamequery(e.target.value)}
                    />
                    <button onClick={handleNameSearch}>Filter</button>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search by roll no."
                        value={Rollquery}
                        onChange={(e) => setRollquery(e.target.value)}
                    />
                    <button onClick={handleRollSearch}>Search</button>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Filter by domain"
                        value={Domainquery}
                        onChange={(e) => setDomainquery(e.target.value)}
                    />
                    <button onClick={handleDomainSearch}>Filter</button>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Filter by Gender"
                        value={Genderquery}
                        onChange={(e) => setGenderquery(e.target.value)}
                    />
                    <button onClick={handleGenderSearch}>Filter</button>
                </div>
            </div>
            <div className="datacontain">
                <div className="head-btn">
                  <p><span style={{fontWeight:"bolder"}}>Number of Data :</span> {submittedData.length}</p>
                  <button onClick={handleSheet}>Generate Sheet</button>

                </div>

                {submittedData.length > 0 ? (
                      <div>
                        {submittedData.map((item, index) => (
                            <div className="data">
                                <h3>{index+1}.</h3>
                                <div className="info">
                                  <p><span style={{fontWeight:"bolder"}}>Name : </span>{item.name}</p>
                                  <p><span style={{fontWeight:"bolder"}}>Email : </span>{item.email}</p>
                                  <p><span style={{fontWeight:"bolder"}}>Roll : </span>{item.roll}</p>
                                  <p><span style={{fontWeight:"bolder"}}>Gender : </span>{item.gender}</p>
                                  <p><span style={{fontWeight:"bolder"}}>Department : </span>{item.department}</p>
                                  <p><span style={{fontWeight:"bolder"}}>Phone : </span>{item.phone}</p>
                                  <p><span style={{fontWeight:"bolder"}}>Domain : </span>{item.domain}</p>
                                  {Object.entries(item.questions_answers || {}).map(([question, answer], idx) => (
                                    <p key={idx}>
                                      <strong>{idx+1}. {question} : </strong> {answer}
                                    </p>
                                  ))}
                                  {Object.entries(item.questions_answers2 || {}).map(([question, answer], idx) => (
                                    <p key={idx}>
                                      <strong>{idx+4}. {question} : </strong> {answer}
                                    </p>
                                  ))}
                                  <button onClick={() => handledelete(item.id)}>Delete</button>
                                </div>
                            </div>

                        ))}
                      </div>
                ) : (
                    <p>No data submitted yet.</p>
                )}
            </div>
        </div >
    )
}

export default AdminDashboard
