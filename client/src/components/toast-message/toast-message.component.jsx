import React from 'react';
import './toast-message.styles.scss';

const ToastMessage = ({ msg, classType }) => {
    console.log(msg);
    if(!msg) return null;
    return msg.map(message => <div key={message} className={`toast toast--${classType}`}>{message.msg}.</div>)
}

ToastMessage.defaultProps = {
    classType: 'danger'
}

export default ToastMessage;