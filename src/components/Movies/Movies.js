import { React, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isLiked, movies, onSave, onDelete, onSubmit, preloader, error, emptyResult, addCards, handleMoreBtn }) {

  const [checkbox, setCheckbox] = useState(false);

  function handleCheckbox() {
    setCheckbox(checkbox);
  }

  return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
        handleCheckbox={handleCheckbox}
        checkbox={checkbox}
        onSubmit={onSubmit}
        error={error}
         />
        <MoviesCardList
        movies={checkbox ? movies : movies.filter(movie => movie.duration <= 40)}
        onSave={onSave}
        onDelete={onDelete}
        emptyResult={emptyResult}
        preloader={preloader}
        addCards={addCards}
        handleMoreBtn={handleMoreBtn}
        isLiked={isLiked}
        />
      </div>
    </section>
  )
}
export default Movies