import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/sampleprofile.png';


const ProfilePage = (props) => {

    let navigate = useNavigate();

    return (
        <>
        <img src='../../assets/SnoozeLogo.svg'></img>
        <div className="box">
          <img className="image" src={image} alt="" />
        </div>
            <div className="text">
                <p>PERSONAL</p>
                <p>BOOKING</p>
                <p>REWARDS</p>
            </div>
             <p className='title-info'>Personal Info</p>
             <div className="Info">

             </div>
             <p className='title-info'>Current Bookings</p>
             <div className="Info1">

             </div>
             <p className='title-info'>Past Bookings</p>
             <div className="Info1">

             </div>
             <p className='title-info'>Rewards</p>
            <div className="Info2">
                
            </div>
        </>
        

      

    
 )

}

export default ProfilePage