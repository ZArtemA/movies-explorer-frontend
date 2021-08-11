import React from 'react';

function MoviesCardList({ card, onCardClick, onCardLike, onCardDelete }) {
return (
<section className="cards">
<ul className="cards__gallery">
    {props.cards.map((cardObj) => {
        return (<
            Card key={cardObj._id}
            card={cardObj}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
        />
        );
    }
    )}
</ul>
</section>
)
}

export default MoviesCardList;