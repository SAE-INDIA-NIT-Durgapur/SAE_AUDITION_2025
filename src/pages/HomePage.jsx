import React from "react";
import ThreeDScene from "../components/ThreeDScene";
import { Typewriter } from "react-simple-typewriter";
// import { Navigate } from "react-router-dom";
import "./HomePage.css";
import Countdown from "../components/Countdown";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import Timeline from "../components/TimeLine.jsx/TimeLine";
import EntryDomains from "../components/EntryDomains/EntryDomains";


const HomePage = () => {
  // const navigate = Navigate();

  return (
    <>
      <div className="w-full overflow-hidden bg-black">
        <div className="w-full h-screen flex flex-col lg:flex-row bg-black ">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-screen bg-black text-white flex flex-col justify-center items-center p-6">
            <div className="content text-center lg:text-left flex items-center flex-col lg:flex-row">
              <div className="header mb-6">
                <h1 className=" lg:text-5xl font-bold pb-2">
                  Audition
                </h1>
                <p className="text-lg lg:text-xl mt-2">
                  Society of Automotive Engineers Collegiate Club of NIT
                  Durgapur
                </p>
              </div>
              <p className="text-md lg:text-lg">
                We are Here to{" "}
                <span>
                  "
                  <Typewriter
                    words={["Collaborate ", "Innovate ", "Invent "]}
                    loop={Infinity}
                    cursor
                    cursorStyle="_"
                    typeSpeed={120}
                    deleteSpeed={80}
                    delaySpeed={1000}
                  />
                  "
                </span>
              </p>
              <div id="tenth" className="reg-buttonBox">
                <button
                  onClick={() => {
                    navigate("/home");
                  }}
                  className=" homebtn  "
                >
                  <span>R</span>
                  <span>E</span>
                  <span>G</span>
                  <span>I</span>
                  <span>S</span>

                  <span>T</span>
                  <span>e</span>
                  <span>R</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-screen">
            <ThreeDScene />
          </div>
        </div>
        
        <div className="w-full h-auto bg-black text-white flex flex-col items-center justify-center">
          <CountdownTimer />
        </div>
        <div className="w-full h-auto bg-black text-white flex flex-col items-center justify-center">
          <EntryDomains />
        </div>
        <div>
          <Timeline />
        </div>
      </div>
    </>
  );
};

export default HomePage;
