import React, { useState, useEffect } from 'react';
import NavBar from '../navbar';
import Post from './post';
import '../style/main.css';

const Main = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch('http://localhost:8080/todos')
      .then((response) => 
        response.json())
      .then(data => 
        setPosts(data))
  }

  /* const handleLogPosts = () => {
    console.log(posts);
  };
  <button onClick={handleLogPosts}>Log</button>
  */

  useEffect(() => {
    fetchPosts();
  }, []);

 return (
    <>
    <NavBar />
      <h1>This is all the posts</h1>
      <div className='poll-list'>
        {posts.map(post => 
          <Post 
            id = {post.id}
            summary = {post.summary}
            description = {post.description}
          />
        )}
      </div>
      
    </>
 );
};

export default Main;