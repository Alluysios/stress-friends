import React, { Fragment } from 'react';
import './form-input.styles.scss';

const FormInput = ({ label, name, id, type, placeholder, fullWidth, onChange }) => {
    return (
        <Fragment>
            <div className={`form-group ${fullWidth && 'fluid'}`}>
                <label htmlFor={name} className='form-label'>{label}</label>
                <input type={type} name={name} id={id} placeholder={placeholder} onChange={onChange} className='form-input' />
            </div>
        </Fragment>
    )
}

export default FormInput;
