import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
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
</section>
)
}

export default MoviesCardList;