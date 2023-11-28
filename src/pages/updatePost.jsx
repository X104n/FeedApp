import React from "react"
import { Link } from "react-router-dom"
import Cookies from 'js-cookie'
import '../style/updatePost.css'

export default function updatePost(props) {

    const updatePost = () => {
        console.log(props)
    }

    const deletePost = () => {
        const url = `http://localhost:8080/poll`
        fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': Cookies.get('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id,
                title: props.title,
                question: props.question
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    return (
        <div className="container">
            <Link to={`/poll/${props.id}`} className="poll">
                <h2 className="post-title">{props.title}</h2>
                <p className="post-question">{props.question}</p>
            </Link>
            <button className="btn btn-primary" onClick={updatePost}>Update</button>
            <button className="btn btn-danger" onClick={deletePost}>Delete</button>
        </div>
        
    )
}