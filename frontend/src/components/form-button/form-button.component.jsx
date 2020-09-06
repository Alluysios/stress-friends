import React from 'react';
import './form-button.styles.scss';

const FormButton = ({ value, btnClass, fluid }) => {
    return <input type='submit' className={`btn btn-${btnClass} ${fluid && 'fluid'}`} value={value} />
}

export default FormButton;