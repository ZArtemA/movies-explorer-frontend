import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser.id;
    const cardDeleteButtonClassName = `card__btn-delete buttons ${isOwn ? '' : 'card__btn-delete_hidden'}`;

    const isLiked = card.likes.some(i => i === currentUser.id);
    const movieButtonClassName = `movie-card__btn-like ${isLiked ? `movie-card__btn-like_active` : ''}`;


    return (
        <li className="movie-card">
            <div className="movie-card__ratio-inner">
            <div className="movie-card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
            </div>
            <div className="movie-card__name-row">
                <h2 className="card__title">{card.name}</h2>
                    <button className={movieButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}>
                    </button>
            </div>
            <p className="movie-card__duration">{card.duration}</p>
        </li>
    )
}

export default MoviesCard;