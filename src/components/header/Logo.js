import React from 'react'
import {Link} from 'react-router-dom';

const Logo = React.memo(() => {
    return (
        <Link to="/" className="Logo">Planner</Link>
    )
})

export default Logo
