import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
    console.log('Header renders');
    return (
        <header className='Header'>
            <Link to="/" className="Logo">Planner</Link>
            <ul className="Header-ul">
                <li className="Header-li">
                    <Link to="/login" className="Header-link">Login</Link>
                </li>
                <li className="Header-li">
                    <Link to="/signup" className="Header-link">Signup</Link>
                </li>
            </ul>
        </header>
    )
}

export default React.memo(Header);
