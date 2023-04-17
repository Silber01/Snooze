import React from 'react';
import './EditProfile.css';
import { useNavigate } from 'react-router-dom';
import SnoozeHeader from '../general/SnoozeHeader';
import icon from '../../assets/sampleprofile.png';

const EditProfile = (props) => {

  let navigate = useNavigate();

  return (
    <div className="EditProfile">
      <SnoozeHeader />
      <div className="container">
        <div className='icon-box'>
          <p className='title'>Edit Profile</p>
          <img className="icon" src={icon} alt="" />
          <p>Edit picture or avator</p>
        </div>
        <div className="info-box">
          <div className='single-box'>
            <p className='text-title'>Name:</p>
            <p>{props.user.name}</p>
          </div>
          <div className='single-box'>
            <p className='text-title'>Email:</p>
            <p>{props.user.email}</p>
          </div>
          {/* <div className='single-box'>
            <p className='text-title'>Phone number:</p>
            <p>{props.user.phoneNumber}</p>
          </div> */}
        </div>
  
        <button className='button' onClick={()=> navigate('/profilepage')}>Save</button>
        
        
      </div>
    </div>
  )
}

export default EditProfile
