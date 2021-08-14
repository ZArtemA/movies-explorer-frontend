import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card }) {

    return (
        <li className="movie-card">
            <div className="movie-card__ratio-inner">
            <div className="movie-card__image" style={{ backgroundImage: `url(${card.link})` }}></div>
            </div>
            <div className="movie-card__name-row">
                <h2 className="card__title">{card.name}</h2>
                    <button className="movie-card__btn-like" type="button" aria-label="Лайк">
                    </button>
            </div>
            <p className="movie-card__duration">{card.duration}</p>
        </li>
    )
}

export default MoviesCard;