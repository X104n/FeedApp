import React, { useEffect, useState } from 'react';
import NavBar from '../navbar';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import '../style/register.css';
import Post from './post';

const Profile = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const userName = decodedToken.name;
    const userEmail = decodedToken.email;

    const [polls, setPolls] = useState([]);

    const test = () => {
        console.log(polls)
    }

    test(() => {
        fetch('http://localhost:8080/user/poll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('token')
            }
        })
            .then(response => {
                console.log(response);
                return response.text()
            })
            .then(data => setPolls(data))
        })

    return (
        <>
        <NavBar/>
            <div className='body'>
                <div className='register-container'>
                    <h1>Profile</h1>
                    <p>Name: {userName}</p>
                    <p>Email: {userEmail}</p>
                    <h2>Your Polls:</h2>
                    <ul>
                        <li>
                            <button className='poll-button' onClick={test}>Poll 1</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Profile;