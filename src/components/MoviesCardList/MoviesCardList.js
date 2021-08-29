import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from './More/More';

function MoviesCardList({ movies, onSave, onDelete }) {

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
    <More />
</section>
)
}

export default MoviesCardList;