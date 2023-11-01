import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../navbar';

const Main = () => {
 const [posts, setPosts] = useState([]);

 useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
 }, []);

 return (
    <>
    <NavBar />
    <div>
        {posts.length > 0 && (
            <>
                <h1>Posts</h1>
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            </>
        )}
    </div>
    </>
 );
};

export default Main;