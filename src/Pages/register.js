import React, { useState } from 'react';
import './register.css';

const Register = () => {
    const [form, setForm] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.repeatPassword || form.email !== form.repeatEmail) {
            setError(true);
        } else {
            setError(false);
            console.log('Form submitted:', form);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="register">
            <h2>Create new user</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat password"
                    value={form.repeatPassword}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="repeatEmail"
                    placeholder="Repeat email"
                    value={form.repeatEmail}
                    onChange={handleChange}
                />
                <button type="submit">Create user</button>
            </form>
            {error && <p>Passwords and emails do not match.</p>}
        </div>
    );
}

export default Register;