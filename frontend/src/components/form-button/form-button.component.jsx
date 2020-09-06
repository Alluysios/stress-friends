import React from 'react';
import './form-button.styles.scss';

const FormButton = ({ value, btnClass }) => {
    return <input type='submit' className={`btn btn-${btnClass}`} value={value} />
}

export default FormButton;