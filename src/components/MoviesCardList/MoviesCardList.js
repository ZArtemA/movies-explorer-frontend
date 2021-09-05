import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from './More/More';
import NotFound from './MoviesNotFound/MoviesNotFound';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, onSave, onDelete, emptyResult, preloader, addCards, handleMoreBtn }) {

return (
<section className="cards">
<ul className="cards__gallery">
    {movies.slice(0, addCards).map((cardObj) => (
       <MoviesCard
            key={cardObj.id}
            card={cardObj}
            onSave={onSave}
            onDelete={onDelete}
        />
        ))}
</ul>
    {preloader && (<Preloader />)}
    {emptyResult && <NotFound />}
    {useLocation().pathname==='/movies' && <More handleMoreBtn={handleMoreBtn} />}
</section>
)
}

export default MoviesCardList;