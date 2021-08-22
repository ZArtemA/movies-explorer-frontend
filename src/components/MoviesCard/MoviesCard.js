import './MoviesCard.css';
import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {

    let pathname = useLocation().pathname;

    return (
        <li className="movie-card">
            <div className="movie-card__image" style={{ backgroundImage: `url(${card.link})` }}></div>
            <div className="movie-card__name-row">
                <h2 className="card__title">{card.name}</h2>
                    <button 
                    className={pathname === "/movies" ? `movie-card__btn-like ${card.isLiked ? "movie-card__btn-like_active" : ""}` : "movie-card__btn-delete"}
                    type="button" aria-label="Лайк">
                    </button>
            </div>
            <p className="movie-card__duration">{card.time}</p>
        </li>
    )
}

export default MoviesCard;