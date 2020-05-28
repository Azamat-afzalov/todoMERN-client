import React, {useContext , useState} from 'react';
import useAuth from '../../hooks/useAuth';
import authContext from '../../context/AuthContext';
import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
    // console.log('Header renders');
    const {authState,authDispatch} = useContext(authContext);
    // const [auth, setAuth] = useState(authState.isAuth);
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        authDispatch({type : "LOGOUT_SUCCESS"})
    }
    return (
        <header className='Header'>
            <Link to="/" className="Logo">Planner</Link>
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
                            <a className="Header-link" onClick={handleLogout}>Logout</a>
                        </li>
                    )
                }


            </ul>
        </header>
    )
}

export default React.memo(Header);
