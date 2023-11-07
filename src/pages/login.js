import React, { useState } from 'react';
import '../style/login.css';
import Register from "./register";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username, 'Password:', password);
    };

    return (
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
                    <button type="button" onClick={() => {navigate("/home");}}>Continue Without a User</button>
                </div>
            </form>
        </div>
    );
};

export default Login;