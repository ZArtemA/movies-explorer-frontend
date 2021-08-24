import './MoviesCard.css';
import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {

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
                    type="button">
                    </button>
                    </div>
                    <div className="movie-card__image-rotate">
            <div className="movie-card__image" style={{ backgroundImage: `url(${card.link})` }}></div>
            </div>
        </li>
    )
}

export default MoviesCard;