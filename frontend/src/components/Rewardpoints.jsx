import React from 'react';
import '../Pages/ProfilePage.css';

const Rewardpoints = (props) => {
    return(
        <>
        <div className='points-box'>

            <h1>Redeem for {props.reward.point} points</h1>
            {/* replace the below code with map */}
            {props.reward.gifts.map (g => {
            return (
                <p> {g} </p>
            )   
            })}
        </div>
        </>
    )
}
export default Rewardpoints