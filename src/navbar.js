import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import './style/navBar.css';
import { jwtDecode } from 'jwt-decode';

const NavBar = ({ history, loggedInUser, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    }

    const getUsername = () => {
        const token = Cookies.get('token');
        if (token === '') {
            return 'Anonymous';
        }
        const decodedToken = jwtDecode(token);
        return decodedToken.name;
    }

    const userDisplay = getUsername();

    return (
        <nav className="navBar">
            <ul>
                
                    <button className="elem" onClick={handleLogout}>Log out</button>
                
                <li>
                    <Link to="/home" className="elem">Home</Link>
                </li>
                <li>
                    <Link to="/profile" className="elem">Logged in as {userDisplay}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;