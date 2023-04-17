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
            <div className="row-box">
                <div className='left'>
                    <img className="image" src={image} alt="" />
                </div>
                <div className='right'>
                    <button className='button-profile' onClick={()=> navigate('/editprofile')}>EditProfile</button>
                    {/* have to change with user input */}
                    <p className="text-pp">Daniel Slade</p>
                </div>
            </div>
            <div className="text">
                <p>PERSONAL</p>
                <p>BOOKING</p>
                <p>REWARDS</p>
            </div>
        </div>
            
             <p className='title-info'>Personal Info</p>
             <div className='info-box'>
                <div className="text-single">
                    <p className='text1'>Email:</p>
                    {/* have to change with user input */}
                    <p>siliver01@gmail.com</p>
                </div>
                <div className="text-single">
                    <p className='text1'>Credit Card:</p>
                    {/* have to figure out how to mask */}
                    <p>0000 1122 3344 1234</p>
                </div>
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