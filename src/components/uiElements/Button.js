import React from 'react';
import './Button.css';

const Button = React.memo(({children,className,type,onClick}) => {
    return (
        <button type={type} className={`Button ${className ? className : ''}`} onClick={onClick}>{children}</button>
    )
})

export default Button
