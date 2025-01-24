import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Formsubmitted.css';

const Formsubmitted = () => {
const navigate = useNavigate();
  return (
    <div className='container'>
        <div className="subcontainer">
            <h1 style={{fontSize:"5vw"}} >Society of Automotive Engineer's-NITD</h1>
            <h1 style={{color:"#fff"}}> <span style={{color:"#0af03f", fontSize:"5vw", fontWeight: "bolder"}}> Congrats ! </span>Your data has been Submitted.</h1>
            <button onClick={()=>{
                navigate("/home");
            }}>Go to HomePage</button>
        </div>
    </div>
  )
}

export default Formsubmitted
