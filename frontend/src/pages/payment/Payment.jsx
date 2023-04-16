import React from 'react';
import "./PaymentTextfield.css"
import { useNavigate } from 'react-router-dom';
import SnoozeHeader from '../general/SnoozeHeader';

const Payment = (props) => {

    let navigate = useNavigate();
  
function Payment()
{
    return (
        <div className='Centerer'>
            <SnoozeHeader />
            <div className="Payment">
                <p className='Payment Details'>Payment Details</p>

                <input type="text" placeholder='When would you like to pay?'/>

                <form className='paymentChoice1'>
                    <input type="text" placeholder='Pay at the property'/>
                    <input type="text" placeholder='Pay now'/>
                </form>

                <form className = 'paymentChoice2'>
                    <input type="text" placeholder='Card'/>
                    <input type="text" placeholder='Google Pay'/>
                    <input type="text" placeholder='PayPal'/>
                </form>

                <form className = 'cardInfo'>
                    <input type="firstName" placeholder='First Name*'/>
                    <input type="lastName" placeholder='Last Name*'/>
                    <input type="cardNumber" placeholder='Card Number*'/>
                    <input type="expDate" placeholder='Expiration Date*'/>
                    <input type="securityCode" placeholder='Security Code*'/>
                </form>

                <p className='billingAddress'>Billing Address</p>

                <form className = 'addressInfo'>
                    <input type="address" placeholder='Address'/>
                    <input type="city" placeholder='City'/>
                    <input type="state" placeholder='State'/>
                    <input type="zipCode" placeholder='Zip Code'/>
                    <input type="country" placeholder='Country'/>
                    <input type="phone" placeholder='Phone'/>
                </form>

                <button className='SaveAddressButton'>Save Address</button>
                <button className='CancelButton'>Cancel</button>

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
            
        </div>

    )
}

}

