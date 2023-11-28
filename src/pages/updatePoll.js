import React, { useState, useEffect } from 'react';
import NavBar from '../navbar';
import Cookies from 'js-cookie';
import '../style/newPoll.css';
import { useLocation, useNavigate } from 'react-router-dom';

function NewPoll(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const passedProps = location.state?.pollData; // Access the passed data

        // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16); // Converts to YYYY-MM-DDTHH:mm format
    };

    // Initialize state with the passed props or default values
    const id = passedProps?.id || null;
    const [title, setTitle] = useState(passedProps?.title || 'bruh');
    const [question, setQuestion] = useState(passedProps?.question || '');
    const [requireLogin, setRequireLogin] = useState(passedProps?.requireLogin || false);
    const [startDate, setStartDate] = useState(formatDate(passedProps?.startDate) || new Date().toISOString().slice(0, 16));
    const [endDate, setEndDate] = useState(formatDate(passedProps?.endDate) || new Date().toISOString().slice(0, 16));
    const [isUpdate, setIsUpdate] = useState(false);

    

    useEffect(() => {
        if (passedProps) {
            setIsUpdate(true); // Set to true if we are updating an existing poll
        }
    }, [passedProps]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleQuestionChange = (e) => setQuestion(e.target.value);
    const handleRequireLoginChange = (e) => setRequireLogin(e.target.checked);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { id, title, question, requireLogin, startDate, endDate };
        const url = `http://localhost:8080/poll`

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('token')
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Success:', data);
            navigate('/profile'); // Redirect after successful operation
        })
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
    };

    return (
        <>
            <NavBar />
            <div className='body'>
                <div className='option-container'>
                    <h1>{isUpdate ? 'Update Poll' : 'Create New Poll'}</h1>
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
                        <button type="submit">Update Poll</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewPoll;
