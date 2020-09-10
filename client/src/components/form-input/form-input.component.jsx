import React, { Fragment } from 'react';
import './form-input.styles.scss';

const FormInput = ({ label, name, id, type, placeholder, onChange, value, ...restProps }) => {
    return (
        <Fragment>
            <div className='form-group'>
                {
                    type === 'file' ? 
                    <div className='form-image-container'>
                        <img src={`/uploads/users/${restProps.image}`} alt='User Profile' className='form-image' />
                    </div>
                    :
                    <label htmlFor={name} className='form-label'>{label}</label>
                }
                <input type={type} name={name} id={id} placeholder={placeholder} value={value} onChange={onChange} className='form-input' />
            </div>
        </Fragment>
    )
}

export default FormInput;
