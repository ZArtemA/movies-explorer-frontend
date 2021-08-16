import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card }) {

    return (
        <li className="movie-card">
            <div className="movie-card__image" style={{ backgroundImage: `url(${card.link})` }}></div>
            <div className="movie-card__name-row">
                <h2 className="card__title">{card.name}</h2>
                    <button className={`movie-card__btn-like ${card.isLiked ? "movie-card__btn-like_active" : ""}`} type="button" aria-label="Лайк">
                    </button>
            </div>
            <p className="movie-card__duration">{card.time}</p>
        </li>
    )
}

export default MoviesCard;