import React, { useState, useRef, useEffect, useContext } from 'react'
import Slider from '@mui/material/Slider';

import './Dropdown.css';

const Dropdown = ({text}) => {
    const [active, setActive] = useState(false);
    const [price, setPrice] = useState([0, 2000]);

    const handleChange = (event, newValue) => {
        setPrice(newValue);
    };

    const renderDropdown = () => {
        if(active){
            return (
                <div className='dropdown-box'>
                    Price Range
                    <Slider
                        getAriaLabel={() => 'Minimum price'}
                        value={price}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        disableSwap
                        min={0}
                        max={2000}
                        className='slider'
                    />
                </div>
            )
        }
    }

    return (
        <div className='dropdown-wrapper'>
            <div className='dropdown-button' onClick={() => {
                setActive(!active)
            }}>{text}</div>
            {renderDropdown()}
        </div>
    )
};

export default Dropdown