import React, { useState } from 'react';
import '../style/register.css';
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    //const [showNotification, setShowNotification] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
    });

    const {
        name,
        password,
        confirmPassword,
        email,
        confirmEmail,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            password,
            email
        };
        fetch('http://localhost:8080/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // TODO: write the correct response status codes.
                if (response.status === 200) return response.text();
                else if (response.status === 401 || response.status === 403) {
                    alert("Invalid name or password");
                    //setErrorMsg("Invalid name or password");
                } else {
                    //setShowNotification(true);
            }
                response.json()
            })
            .then(data => {
                if (data) {
                    navigate("/");
                }
            })
            .catch(error => {
                console.error(error)
            });
        //setShowNotification(false);
    };

    return (
        <div className="body">
        <div className="register-container">
            <h2>Create new user</h2>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="input-field">
                    <label htmlFor="name">name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
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