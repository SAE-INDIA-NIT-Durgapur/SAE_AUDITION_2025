import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faCalendarAlt,
  faPalette,
  faCamera,
  faRobot,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import "./EntryDomains.css";

const EntryDomains = () => {
  return (
    <div className="domain-container ">
      <h1 className="text-6xl">Domains</h1>
      <div className="domain-cards">
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faLaptopCode} />
            <p className="title">Web Developer</p>
          </div>
          {/* <a href="#" className="count">
            6 open positions
          </a> */}
        </div>
        <div className="domain-card ">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faCalendarAlt} />
            <p className="title">Event Management</p>
          </div>
          <div  className="count" id="default-selected">
            8 open positions
          </div>
        </div>
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faPalette} />
            <p className="title">Graphics Design</p>
          </div>
          <div  className="count">
            2 open positions
          </div>
        </div>
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faFilm} />
            <p className="title">Video Editing</p>
          </div>
          <div  className="count">
            6 open positions
          </div>
        </div>
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faRobot} />
            <p className="title">Automobile and Robotics</p>
          </div>
          <div  className="count">
            7 open positions
          </div>
        </div>
        <div className="domain-card">
          <div className="domain-icon">
            <FontAwesomeIcon className="FontAwesomeIcon" icon={faCamera} />
            <p className="title">Photography</p>
          </div>
          <div  className="count">
            8 open positions
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryDomains;
