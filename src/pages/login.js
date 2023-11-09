import React, { useState } from 'react';
import '../style/login.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserProvider";
import Notification from "./notification";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const user = useUser();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    //const [errorMsg, setErrorMsg] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleAnonymous = (e) => {
        setUsername("anonymous");
        handleSubmit(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username,
            password
        };
        fetch('http://localhost:8080/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json()
            )
            .then(data => {
                console.log(data)
                Cookies.set("token", data.username);
                navigate("/home");
            })
            .catch(error => console.error(error));
        setShowNotification(false);
    };

    return (
        <>
        {showNotification && <Notification message="Something went wrong" />}
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-button-container">
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => {navigate("/register");}}>Register New User</button>

                </div>
                <div className="login-button-container">
                    <button type="button" onClick={handleAnonymous}>Continue Without a User</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default Login;