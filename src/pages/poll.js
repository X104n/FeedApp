import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../navbar';
import '../style/poll.css';

function Poll() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    const fetchPosts = () => {
        fetch(`http://localhost:8080/todos/${id}`)
          .then((response) => 
            response.json())
          .then(data => 
            setData(data))
    }

    useEffect(() => {
    fetchPosts();
    }, []);

    return (
        <>
        <NavBar />
        <h1 className='title'>Poll {id}</h1>
        <div className='content'>
            <h2>{data.summary}</h2>
            <p>{data.description}</p>
        </div>
        
        </>
    );
}
export default Poll;