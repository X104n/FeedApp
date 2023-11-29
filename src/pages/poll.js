import React, { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { useParams } from 'react-router-dom';
import NavBar from '../navbar';
import '../style/poll.css';
import Cookies from 'js-cookie';

function Poll() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    const handleClick = () => {
        console.log(data);
    }

    const fetchPosts = useCallback(() => { // Wrap fetchPosts with useCallback
      fetch(`http://localhost:8080/poll/${id}`)
        .then((response) => 
          response.json())
        .then(data => 
          setData(data))
    }, [id]); // Add id to the dependency array of useCallback


const postVote = (vote) => {
  fetch('http://localhost:8080/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Cookies.get('token')
    },
    body: JSON.stringify(vote)
  })
  .then((response) => {
    if (response.status === 403) {
      throw new Error('You have allready voted on this poll');
    } else if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => alert(error));
}

    const handleSubmit = (e) => {
      e.preventDefault();
	    const answer = e.target.name === "yes";

      const vote = {
		  choice : answer,
      poll : data
	    }
      console.log("Bruv");
      console.log(data)
      console.log(vote);
      postVote(vote);
    };

    useEffect(() => {
      fetchPosts();
    }, [fetchPosts]);


    return (
        <>
        <NavBar />
        <h1 className='title'>Poll {id}</h1>
        <div className='content'>
            <h2>{data.title}</h2>
            <p className="question">{data.question}</p>
            <p>This poll stated: {data.startDate}</p>
            <p>This poll will end: {data.endDate}</p>
            <div>
                <p>Yes: {data.greenVotes}</p>
                <p>No: {data.redVotes}</p>
            </div>
            <div>
              	<button name="yes" onClick={handleSubmit}>Vote yes</button>
            	<button name="no" onClick={handleSubmit}>Vote no</button>
            </div>
            {data && data.createdBy ? (<p>Created by: {data.createdBy.name}</p>) : (<p>Created by: Anonymous</p>)}
            
            <button onClick={handleClick}>printPoll</button>
            <button onAbort={console.log(data)}>Test</button>
        </div>
        
        </>
    );
}
export default Poll;