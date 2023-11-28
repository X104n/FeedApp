import React, { useEffect, useState } from 'react';
import NavBar from '../navbar';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import '../style/register.css';
import UpdatePost from './updatePost';

const Profile = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const userName = decodedToken.name;
    const userEmail = decodedToken.email;

    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        fetch('http://localhost:8080/user/poll', {
            method: 'GET',
            headers: {
                'Authorization': Cookies.get('token')
            }
        })
        .then((response) => {
            if (!response.ok) {
                console.error(`Response status: ${response.status}, status text: '${response.statusText}'`);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                setPosts(data);
            } else {
                console.log('No data received');
            }
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    useEffect(() => {
        fetchPosts();
    }, [posts]);

    return (
        <>
            <NavBar />
            <div className='body'>
                <div className='register-container'>
                    <h1>Profile</h1>
                    <p>Name: {userName}</p>
                    <p>Email: {userEmail}</p>
                    <h2>Your Polls:</h2>
                    {posts.map(post => 
                    <UpdatePost 
                        key = {post.id}
                        id = {post.id}
                        title = {post.title}
                        question = {post.question}
                    />
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;