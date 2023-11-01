import React, { useState } from 'react';
import '../style/register.css';
import Login from "./login";
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
    });

    const {
        username,
        password,
        confirmPassword,
        email,
        confirmEmail,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
        } else if (email !== confirmEmail) {
            alert('Emails do not match');
        } else {
            handleRegisterClick();
        }
    };

    const handleRegisterClick = () => {
        console.log('Username:', username, 'Password:', password, 'Email:', email);
    }

    const handleBackClick = () => {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    return (
        <div className="body">
        <div className="register-container">
            <h2>Create new user</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="input-field">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="confirmPassword">Repeat password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="confirmEmail">Repeat email:</label>
                    <input
                        type="email"
                        id="confirmEmail"
                        name="confirmEmail"
                        value={confirmEmail}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <input type="submit" value="Register" className="submit-btn" />
                <button type="button" value="Back" onClick={() => {navigate("/");}}>Back</button>
            </form>
        </div>
        </div>
    );
};

export default Register;