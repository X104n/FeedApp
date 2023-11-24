import React, { useState } from 'react';
import NavBar from '../navbar';
import Cookies from 'js-cookie';
import '../style/newPoll.css';

function NewPoll() {
    const url = 'http://localhost:8080/poll';
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [requireLogin, setRequireLogin] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleRequireLoginChange = (e) => {
        setRequireLogin(e.target.checked);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title,
            question,
            requireLogin,
            startDate,
            endDate
        };
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('token')
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error));
    };

    return (
        <>
        <NavBar />
            <div className='body'>
                            <div className='option-container'>
                <h1>Create new Poll</h1>
                <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" value={title} onChange={handleTitleChange} />
                        </div>

                        <div>
                            <label htmlFor="question">Question:</label>
                            <input type="text" id="question" value={question} onChange={handleQuestionChange} />
                        </div>

                        <div>
                            <label htmlFor="requireLogin">Should the poll require login:</label>
                            <input type="checkbox" id="requireLogin" checked={requireLogin} onChange={handleRequireLoginChange} />
                        </div>

                        <div>
                            <label htmlFor="startDate">Start Date:</label>
                            <input type="datetime-local" id="startDate" value={startDate} onChange={handleStartDateChange} />
                        </div>

                        <div>
                            <label htmlFor="endDate">End Date: </label>
                            <input type="datetime-local" id="endDate" value={endDate} onChange={handleEndDateChange} />
                        </div>
                    <button type="submit">Post Poll</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default NewPoll;