import React, { useState } from 'react';
import '../style/login.css';
import { useNavigate } from "react-router-dom";
import Notification from "./notification";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    //const [errorMsg, setErrorMsg] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleAnonymous = (e) => {
        setName("anonymous");
        handleSubmit(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name === '' ? 'Anonymous' : name,
            password: password === 'password' ? null : password
        };
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok){throw new Error("Something went wrong");}
                return response.text()
            })
            .then(data => {
                Cookies.set('token', data); // Set the cookie named 'token' with the value of temp
                navigate("/home");
            })
            .catch(error => {
                alert(error)
                setShowNotification(false);
            });
    };

    return (
        <>
        {showNotification && <Notification message="Something went wrong" />}
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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