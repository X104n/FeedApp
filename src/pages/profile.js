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
    const userPolls = decodedToken.polls;

    const [polls, setPolls] = useState([]);

    useEffect(() => {
        Promise.all(userPolls.map(pollId => 
            fetch(`http://localhost:8080/poll/${pollId}`)
                .then(response => response.json())
        ))
        .then(fetchedPolls => {
            console.log(fetchedPolls); // Log the fetched polls
            setPolls(fetchedPolls);
        })
        .catch(error => console.error('Error:', error));
    }, [userPolls]);

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
                    {polls.map(poll => 
                    <Post 
                        key = {poll.id}
                        id = {poll.id}
                        title = {poll.title}
                        question = {poll.question}
                    />
                    )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Profile;