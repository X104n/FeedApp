import React, { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { useParams } from 'react-router-dom';
import NavBar from '../navbar';
import '../style/poll.css';

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
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(vote)
		
		})
			.then((response) =>
				response.json())
			.then(d =>
				console.log(d))

	}

    const handleSubmit = (e) => {
      e.preventDefault();

	  const answer = e.target.name === "yes";

      const vote = {
		choice : answer
	  }
      postVote(vote);
    };

    useEffect(() => {
      fetchPosts();
    }, [fetchPosts]); // Add fetchPosts to the dependency array of useEffect


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
              	<button name="yes" onClick={handleSubmit}>Vote yes</button>
            	<button name="no" onClick={handleSubmit}>Vote no</button>
            </div>
            {data.creator ? (<p>Created by: {data.creator}</p>) : (<p>Created by: Anonymous</p>)}
            
            <button onClick={handleClick}>printPoll</button>
            
        </div>
        
        </>
    );
}
export default Poll;