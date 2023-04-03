import React from 'react';
import './EditProfile.css';
import SnoozeHeader from '../general/SnoozeHeader';
import icon from '../../assets/sampleprofile.png';

const EditProfile = (props) => {
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
            <p >Daniel Slade</p>
          </div>
          <div className='single-box'>
            <p className='text-title'>Email:</p>
            <p >abc@gmail.com</p>
          </div>
          <div className='single-box'>
            <p className='text-title'>Phone number:</p>
            <p >123456789</p>
          </div>
        </div>
        <button className='button'>Save</button>
        
        
      </div>
    </div>
  )
}

export default EditProfile
