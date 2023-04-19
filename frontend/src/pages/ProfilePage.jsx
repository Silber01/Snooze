import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/sampleprofile.png';
import Rewardpoints from '../components/Rewardpoints';


const ProfilePage = (props) => {

    let navigate = useNavigate();
    const pointList = [
        {
            point: 1500,
            gifts: ["Snooze Keychains", "Snooze Pen", "Snooze Sleeping Mask"]
        },
        {
            point: 3000,
            gifts: ["$15 Giftcard", "$15 Voucher"]
        },
        {
            point: 20000,
            gifts: ["Hotel Gift Basket", "Snooze Blanket"]
        },
        {
            point: 100000,
            gifts: ["Free Stay at Hotel under $200 per night", "Free Flight up to $250"]
        },
        {
            point: 500000,
            gifts: ["Full Paid Trip (Hotel and Flight) for 5 day stay at Any Hotel"]
        },
        


    ]
    const name = `${props.user.firstName} ${props.user.lastName}`;

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
                    <p className="text-pp">{name}</p>
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
                    <p>{props.user.email}</p>
                </div>
                <div className="text-single">
                    {/* <p className='text1'>Credit Card:</p> */}
                    {/* have to figure out how to mask */}
                    {/* <p>0000 1122 3344 1234</p> */}
                </div>
             </div>
             
             <p className='title-info'>Current Bookings</p>
             <div className="Info1">
                {/* have to figure out how to show the bookings */}
             </div>
             <p className='title-info'>Past Bookings</p>
             <div className="Info1">
                {/* have to figure out showing past bookings */}
             </div>

             <p className='title-info'>Rewards</p>
             <div className="Info2">
                <p className='rewards'> Points & Rewards</p>
                <div className='circle'>
                    <div className='rewardtext'>
                        {/* have to figure out how to get reward points and replace here */}
                        <p>1,000,000 <br/> Points available </p>
                    </div>
                </div>
                {/* call the component instead of writing the same code multiple time */}
                {pointList.map(reward => {
                return (
                    <Rewardpoints reward={reward}/>
                )
                })}
              
             </div>
             
        </>
     
 )

}

export default ProfilePage