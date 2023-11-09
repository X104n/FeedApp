import React from "react"
import { Link } from "react-router-dom"

export default function Post(props) {
    return (
        <Link to={`/poll/${props.id}`} className="poll">
            <h2 className="post-title">{props.title}</h2>
            <p className="post-question">{props.question}</p>
        </Link>
    )
}