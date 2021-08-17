import React from 'react';
import './Checkbox.css';

function Checkbox({ handleCheckbox, checkbox }) {

    return (
        <fieldset className="checkbox">
        <p className="checkbox-text">Короткометражки</p>
        <label className="checkbox-btn" for="checkbox">
        <input
           onClick={handleCheckbox}
           type="checkbox"
           className="checkbox-toggle"
           name="checkbox"
           id="checkbox"
           defaultChecked={checkbox}
        />
        <span className="pseudo-item"><span className="pseudo-item-knob"></span></span>
        </label>
         </fieldset>
    )
}

export default Checkbox;