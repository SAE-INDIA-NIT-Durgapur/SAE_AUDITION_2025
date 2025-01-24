import React, { useState } from 'react';
import axios from 'axios';
import "./AdminDashboard.css";
const AdminDashboard = () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [Namequery, setNamequery] = useState('');
    const [Rollquery, setRollquery] = useState('');
    const [Domainquery, setDomainquery] = useState('');
    const [Genderquery, setGenderquery] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/auditionform/');
            setSubmittedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handledelete = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`); // Send DELETE request to backend
        // Update UI by removing deleted item
        fetchData();

    }
    const handleNameSearch = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/search/', {
            params: { Namequery },
          });
          setSubmittedData(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
    const handleRollSearch = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/search/', {
            params: { Rollquery },
          });
          setSubmittedData(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
    const handleDomainSearch = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/search/', {
            params: { Domainquery },
          });
          setSubmittedData(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      };
    const handleGenderSearch = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/search/', {
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
