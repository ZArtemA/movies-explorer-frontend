import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from './More/More';
import cards from '../../utils/data';

function MoviesCardList() {

return (
<section className="cards">
<ul className="cards__gallery">
    {cards.map((cardObj) => (
       <
            MoviesCard key={cardObj._id}
            card={cardObj}
        />
        ))}

</ul>
    <More />
</section>
)
}

export default MoviesCardList;