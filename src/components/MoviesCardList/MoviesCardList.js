import React from 'react';
import './MoviesCardList.css';

function MoviesCardList({ card }) {
return (
<section className="cards">
<ul className="cards__gallery">
    {props.cards.map((cardObj) => {
        return (<
            Card key={cardObj._id}
            card={cardObj}
        />
        );
    }
    )}
</ul>
</section>
)
}

export default MoviesCardList;