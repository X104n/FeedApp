import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import './style/navBar.css';

const NavBar = ({ history, loggedInUser, onLogout }) => {
    const navigate = useNavigate();
    const userDisplay = loggedInUser ? loggedInUser : 'Guest';
    const [dropdownOpen, setDropdownOpen] = useState(true);

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    }

    return (
        <nav className="navBar">
            <ul>
                <li>
                    <button className="elem" onClick={handleLogout}>Log out</button>
                </li>
                <li>
                    <Link to="/home" className="elem">Home</Link>
                </li>
                <li>
                    <div className="elem">
                        Logged in as: {userDisplay}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;