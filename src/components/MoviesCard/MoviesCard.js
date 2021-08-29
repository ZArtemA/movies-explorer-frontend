import './MoviesCard.css';
import { useLocation } from "react-router-dom";

function MoviesCard({ card, onSave, onDelete }) {

    let pathname = useLocation().pathname;

    return (
        <li className="movie-card">
            <div className="movie-card__content">
            <div className="movie-card__info">
                <h2 className="card__title">{card.name}</h2>
                <p className="movie-card__duration">{card.time}</p>
            </div>
                    <button 
                    className={pathname === "/movies" ? `movie-card__btn-like ${card.isLiked ? "movie-card__btn-like_active" : ""}` : "movie-card__btn-delete"}
                    type="button"
                    onClick={!card.isLiked ? onSave : onDelete}
                    >
                    </button>
                    </div>
            <img className="movie-card__image" src={card.link} alt={card.name} />
        </li>
    )
}

export default MoviesCard;