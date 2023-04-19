import React from 'react';
import "./Payment.css";
import { useNavigate } from 'react-router-dom';
import SnoozeHeader from '../../general/SnoozeHeader';


export default function Payment(props)
{
    return (
        <>
            <SnoozeHeader />
            
            <div className="Payment">
                <p className='paymentDetails'>Payment Details</p>
                <hr></hr>
                
                <form className='paymentChoice1'>
                    <label>When would you like to pay?</label><br/>
                    <input type="radio" id="payAtProperty" name="paymentChoice" value='Pay at the property'/>
                    <label for="payAtProperty">Pay at the Property</label><br/>
                    <input type="radio" id="payNow" name="paymentChoice" value='Pay Now'/>
                    <label for="payAtProperty">Pay Now</label><br/>
                </form>

                {/* We're just gonna assume we're using cards
                <form className = 'paymentChoice2'>
                    <input type="text" placeholder='Card'/>
                    <input type="text" placeholder='Google Pay'/>
                    <input type="text" placeholder='PayPal'/>
                </form> */}

                <form className = 'cardInfo'>
                    <label className="formLabel" for="firstName">First Name<span className="reqField">*</span></label><br/>
                    <input id="firstName"/><br/>

                    <label className="formLabel" for="lastName">Last Name<span className="reqField">*</span></label><br/>
                    <input id="lastName"/><br/>

                    <label className="formLabel" for="cardNumber">Card Number<span className="reqField">*</span></label><br/>
                    <input id="cardNumber" placeholder='0000 0000 0000 0000'/><br/>

                    <label className="formLabel" for="expDateMM">Expiration Date<span className="reqField">*</span></label><br/>
                    <input id="expDateMM" placeholder='MM'/><span className="expDateDivider">/</span>
                    <input id="expDateDD" placeholder='DD'/><br/>

                    <label className="formLabel" for="securityCode">Security Code<span className="reqField">*</span></label><br/>
                    <input id="securityCode" placeholder='000'/>
                </form>
                <hr></hr>
                <p className='billingAddress'>Billing Address</p>

                <form className = 'addressInfo'>
                    <div className='addressInfoLine'>
                        <label className="address1" for="firstName">Address</label>
                        <input id="address1" type="address" placeholder='Address Line 1'/><br/>
                    </div>
                    <div className='addressInfoLine'>
                        <label className="address1" for="firstName"></label>
                        <input id="address2" type="address" placeholder='Address Line 2'/><br/>
                    </div>
                    <div className='addressInfoLine'>
                        <label className="address1" for="firstName">City</label>
                        <input id="city" type="city" placeholder='City'/><br/>
                    </div>
                    <div className='addressInfoLine'>
                    <label className="address1" for="firstName">State</label>
                    <input id="state" type="state" placeholder='State'/><br/>
                    </div>
                    <div className='addressInfoLine'>
                        <label className="address1" for="firstName">Zip Code</label>
                        <input id="zipCode"type="zipCode" placeholder='Zip Code'/><br/>
                    </div>
                    <div className='addressInfoLine'>
                    <label className="address1" for="firstName">Country</label>
                    <input id="country" type="country" placeholder='Country'/><br/>
                    </div>
                    {/* No phone entry */}
                </form>

                <p className='pricedetails'>Price Details</p>

                <form className = 'addressInfo'>
                    <input type="duration" placeholder='1 room x 1 night'/>
                    <input type="taxes&fees" placeholder='Taxes and Fees'/>
                    <input type="pointsEarned" placeholder='Points Earned'/>
                    <input type="totalprice" placeholder='Total Price'/>
                </form>

                <button className='update'>Update</button>

                <form className = 'durationInfo'>
                    <input type="checkin" placeholder='Check-In'/>
                    <input type="checkout" placeholder='Check-Out'/>
                </form>

                <button className='back'>Back</button>
                <button className='confirmbooking'>Confirm Booking</button>

            </div>
            
        </>
        

    )
}


