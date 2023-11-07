import React from "react"
import { Link } from "react-router-dom"

export default function Post(props) {
    return (
        <Link to={`/poll/${props.id}`} className="poll">
            <h2 className="post-summary">{props.summary}</h2>
            <p className="post-description">{props.description}</p>
        </Link>
    )
}