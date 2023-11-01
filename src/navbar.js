import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/navBar.css';
import { Dropdown } from 'react-bootstrap';

const NavBar = ({ history, loggedInUser, onLogout }) => {
    const userDisplay = loggedInUser ? loggedInUser : 'Guest';
    const [dropdownOpen, setDropdownOpen] = useState(true);

    return (
        <nav className="navBar">
            <ul>
                <li>
                    <Link to="/" className="elem">Log out</Link>
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