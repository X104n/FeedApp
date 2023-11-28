import React, { useEffect, useState } from 'react';
import NavBar from '../navbar';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import '../style/register.css';
import Post from './post';

const Profile = () => {
    const token = Cookies.get('token');
    const decodedToken = jwtDecode(token);
    const userName = decodedToken.name;
    const userEmail = decodedToken.email;

    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        fetch('http://localhost:8080/poll', {
            method: 'GET',
            headers: {
                'Authorization': Cookies.get('token')
            }
        })
            .then((response) => {
                return response.json()
            })
            .then(data =>
                setPosts(data))
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
                    <Post 
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