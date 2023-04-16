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
        </>
        

      

    
 )

}

export default ProfilePage