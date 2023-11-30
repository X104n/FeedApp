import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../navbar';
import '../style/poll.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

function Poll() {
    const { id } = useParams();
    
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);

    const fetchPosts = useCallback(async () => {
        try {
            // Fetch poll data
            const pollResponse = await fetch(`http://localhost:8080/poll/${id}`);
            if (!pollResponse.ok) {
                throw new Error('Poll data fetch failed');
            }
            const pollData = await pollResponse.json();
            setData(pollData);

            // Fetch user data
            if (Cookies.get('token') !== "") {
                const token = Cookies.get('token');
                const decodedToken = jwtDecode(token);
                const userName = decodedToken.name;
  
                const userResponse = await fetch(`http://localhost:8080/user/${userName}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': token
                    }
                });

                if (!userResponse.ok) {
                    throw new Error('User data fetch failed');
                }
                const userData = await userResponse.json();
                setUserData(userData);
            } else {
              console.log('No user data received');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id]);

    const postVote = (vote) => {
        let method = 'POST';
        let hasVoted = false;
        if (Cookies.get('token') !== "") {
            

            if (userData && userData.votes) {
                for (const userVote of userData.votes) {
                    if (userVote.poll.id === vote.poll.id) {
                        hasVoted = true;
                        break;
                    } else if (userVote.poll.id === vote.poll.id) {
						hasVoted = true;
                        break;
					}
                }
            }
        }

		if (hasVoted) {
			method = 'PUT';
		}

		fetch('http://localhost:8080/vote', {
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': Cookies.get('token')
			},
			body: JSON.stringify(vote)
		})
		.then((response) => {
			if (response.status === 403) {
				throw new Error('You have already voted on this poll');
			} else if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => console.log(data))
		.catch(error => alert(error));
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const answer = e.target.name === "yes";
        const vote = {
            choice: answer,
            poll: data
        };
        postVote(vote);
        fetchPosts();
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
                <p>This poll started: {data.startDate}</p>
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
            </div>
        </>
    );
}

export default Poll;
