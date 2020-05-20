import React from 'react'

const Button = React.memo(({children,className,type}) => {
    return (
        <button type={type} className={className} >{children}</button>
    )
})

export default Button
