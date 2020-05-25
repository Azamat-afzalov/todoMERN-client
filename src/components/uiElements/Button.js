import React from 'react';
import './Button.css';

const Button = React.memo(({children,className,type}) => {
    return (
        <button type={type} className={`Button ${className ? className : ''}`}>{children}</button>
    )
})

export default Button
