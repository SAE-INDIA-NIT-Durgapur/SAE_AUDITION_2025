import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdBadge, faPhone, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const EmailFromLS = localStorage.getItem("email");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || EmailFromLS || "",
    roll: "",
    phone: "",
    department: "",
    gender: "",
    domain: [],
    questions_answers: {},
    questions_answers2: {},
  });
  const [steperrors, setStepErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const questions = [
    "What motivates you to join this domain?",
    "Describe a challenging situation and how you overcame it.",
  ];
  const questions2 = [
    "Describe a challenging situation and how you overcame it.",
    "What motivates you to join this domain?",
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const domainOptions = [
    { value: "Event Management ,", label: "Event Management" },
    { value: "Automobiles & Robotics ,", label: "Automobiles & Robotics" },
    { value: "Web Development ,", label: "Web Development" },
    { value: "GFX & VFX & Photography ,", label: "GFX & VFX & Photography" },
  ];

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.roll) newErrors.roll = "Roll number is required.";
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.gender) newErrors.gender = "Gender selection is required.";
    if (!formData.domain.length)
      newErrors.domain = "At least one domain is required.";
    return newErrors;
  };

  const nextStep = () => {
    let newErrors = {};

    if (step === 1) {
      newErrors = validateStep1();
    }
    if (Object.keys(newErrors).length > 0) {
      setStepErrors(newErrors);
    } else {
      setStepErrors({});
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      gender: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleDomainChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({ ...prev, domain: selectedValues }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auditionform/",
        formData,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const scriptURL =
      "https://script.google.com/macros/s/AKfycbw4Gn4d1lKnlvTTI93oawElK30_f6QExVVYnGCHDhuoxu2s_PgQZnzXqGfDanN5itM/exec"; // Your Google 
      const sheetId = "1itBcM8lQNnY4Do0NUlFV6EA3x9UbwH0OcSpcTB7zxRQ";
      try {
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: new URLSearchParams(formData),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Success:', result);
        // alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form.');
      }
      if (response.status === 201) {
        setFormData({
          name: "",
          email: "",
          roll: "",
          phone: "",
          gender: "",
          department: "",
          domain: [],
          questions_answers: {},
          questions_answers2: {},

        });
        navigate("/formSubmitted");
      }
    } catch (err) {
      if (err.response && err.response.data.roll) {
        setError("This Roll Already Exists.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  switch (step) {
    case 1:
      return (
        <div className="formroot">
          <div className="fcontainer">
            <div className="formcontainer">
              <form>
                <img
                  src="https://swarajjaiswal.github.io/saeevents/logo.png"
                  alt=""
                  id="logo"
                />
                <div style={{ position: "relative" }} className="userinput">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#fff",
                    }}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{ paddingLeft: "35px" }}
                  />
                </div>
                <div style={{ position: "relative" }}className="userinput">
                  <FontAwesomeIcon
                    icon={faIdBadge}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#fff",
                    }}
                  />
                  <input
                    type="text"
                    name="roll"
                    placeholder="Enter Your Roll No."
                    value={formData.roll}
                    onChange={handleInputChange}
                    required
                    style={{ paddingLeft: "35px" }}
                  />
                </div>
                <div style={{ position: "relative" }} className="userinput">
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#fff",
                    }}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Your Phone No."
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{ paddingLeft: "35px" }}
                  />
                </div>
                <div style={{ position: "relative" }} className="userinput">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#fff",
                    }}
                  />
                  <input
                    type="text"
                    name="department"
                    placeholder="Enter Your Department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    style={{ paddingLeft: "35px" }}
                  />
                </div>
                <Select
                  className="genderoption"
                  options={genderOptions}
                  onChange={handleGenderChange}
                  placeholder="Select Gender"
                />
                <Select
                  className="domainoption"
                  options={domainOptions}
                  isMulti
                  onChange={handleDomainChange}
                  value={domainOptions.filter((option) =>
                    formData.domain.includes(option.value)
                  )}
                  placeholder="Select Domains"
                />
              </form>
              <div className="fbtn">
                <button type="button" onClick={nextStep}>
                  Next
                </button>
                {Object.values(steperrors).length > 0 && (
                  <p style={{ color: "red" }}>{Object.values(steperrors)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    // Handle other steps as before...
    case 2:
      return (
        <div className="qmain">

          <div className="qcontainer">
            <div className="qcontain">
              {questions.map((question, index) => (
                <div key={index} className="question-block">
                  <div className="ques">
                    <h1>{question}</h1>
                  </div>
                  <textarea
                    name={`question_${index}`} // Use unique name attribute
                    placeholder="Enter Your Answer..."
                    value={formData.questions_answers[question] || ""} // Ensure unique storage per question
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        questions_answers: {
                          ...prevData.questions_answers,
                          [question]: e.target.value, // Store by question text
                        },
                      }))
                    }
                  ></textarea>
                </div>
              ))}
            </div>
            <div className="button-container">
              <button type="button" onClick={prevStep} className="btn">
                Back
              </button>
              <button type="button" onClick={nextStep} className="btn">
                Next
              </button>
            </div>
          </div>
        </div>

      );
    case 3:
      return (

        <div className="qmain">
        <div className="qcontainer">
          <div className="qcontain">
            {questions2.map((question2, index) => (
              <div key={index} className="question-block">
                <div className="ques">
                  <h1>{question2}</h1>
                </div>
                <textarea
                  name={`question2_${index}`} // Use unique name attribute
                  placeholder="Enter Your Answer..."
                  value={formData.questions_answers2[question2] || ""} // Ensure unique storage per question2
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      questions_answers2: {
                        ...prevData.questions_answers2,
                        [question2]: e.target.value, // Store by question text
                      },
                    }))
                  }
                ></textarea>

              </div>
            ))}
          </div>
          <div className="button-container">
            <button type="button" onClick={prevStep} className="btn">
              Back
            </button>
            <button type="button" onClick={nextStep} className="btn">
              Next
            </button>
          </div>
        </div>
        </div>
      );


    case 4:
      return (
        <div className="formreview">
          <form className="finalview">
            <div className="details">

              <h2><span style={{ textTransform: "uppercase", color: "#aa14f5" }}>Final Step </span>: Review Details</h2>
              <p>
                <strong>Name  :  </strong> {formData.name}
              </p>
              <p>
                <strong>Email  :  </strong> {formData.email}
              </p>
              <p>
                <strong>Roll  : </strong> {formData.roll}
              </p>
              <p>
                <strong>Phone  :  </strong> {formData.phone}
              </p>
              <p>
                <strong>Department  :  </strong> {formData.department}
              </p>
              <p>
                <strong>Domain  :  </strong> {formData.domain}
              </p>
            </div>
            <div className="button-container">
              <button type="button" onClick={prevStep} className="btn">
                Back
              </button>
              <button type="submit" onClick={handleSubmit} className="btn">
                Submit
              </button>
            </div>
          </form>
          {successMessage && <p style={{ color: "#fff" }}>{successMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      );

    default:
      return <h2>Invalid Step</h2>;
  }
};

export default RegisterPage;
