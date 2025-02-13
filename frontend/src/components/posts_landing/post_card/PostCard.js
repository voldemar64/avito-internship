import "./PostCard.css";
import React from "react";
import { useLocation } from "react-router-dom";

function PostCard({ key, card}) {

    return(
        <li className="card" key={key}>
            <div className="card__container">
                <p className="card__title">
                    {card.name}
                </p>
                <p className="card__duration">
                    {card.description}
                </p>
            </div>
        </li>
    )
}

export default PostCard;