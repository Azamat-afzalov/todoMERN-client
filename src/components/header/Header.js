import React, {useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import globalContext from '../../context/globalContext';
import {Link} from 'react-router-dom';
import Logo from './Logo';
import './header.css';

const Header = React.memo(() => {
    const { authState, authDispatch} = useContext(globalContext);
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        authDispatch({type : "LOGOUT_SUCCESS"})
    }
    return (
        <header className='Header'>
            <Logo/>
            <ul className="Header-ul">
                {
                    !authState.isAuth ? (
                    <>
                        <li className="Header-li">
                            <Link to="/login" className="Header-link">Login</Link>
                        </li>
                        <li className="Header-li">
                            <Link to="/signup" className="Header-link">Signup</Link>
                        </li>
                    </>
                    ):(
                        <li className="Header-li">
                            <span className="Header-link" onClick={handleLogout}>Logout</span>
                        </li>
                    )
                }
            </ul>
        </header>
    )
})

export default Header;
