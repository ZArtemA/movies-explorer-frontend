import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from './More/More';
import NotFound from './MoviesNotFound/MoviesNotFound';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies, onSave, onDelete, emptyResult, preloader }) {

return (
<section className="cards">
<ul className="cards__gallery">
    {movies.map((cardObj) => (
       <MoviesCard
            key={cardObj._id}
            card={cardObj}
            onSave={onSave}
            onDelete={onDelete}
        />
        ))}

</ul>
    {preloader && (<Preloader />)}
    {emptyResult && <NotFound />}
    {useLocation().pathname==='/movies' && <More />}
</section>
)
}

export default MoviesCardList;