import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../navbar';
import Post from './post';
import '../style/main.css';

const Main = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch('http://localhost:8080/poll', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('token'),
      }
    })
      .then( (response) => {
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
    <div className='bar'>
      <Link to='/newPoll' className='bar-button'> 
        Create new poll
      </Link>
      <Link to='/search' className='bar-button'>
        Search for poll
      </Link>
    </div>
      
      <div className='poll-list'>
      <h1>Polls</h1>
        {posts.map(post => 
          <Post 
            key = {post.id}
			id = {post.id}
            title = {post.title}
            question = {post.question}
          />
        )}
      </div>
      
    </>
 );
};

export default Main;