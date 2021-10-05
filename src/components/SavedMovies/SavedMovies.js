import { React, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ isLiked, movies, onSubmit, onDelete, preloader, error, emptyResult  }) {

  const [checkbox, setCheckbox] = useState(false);

  function handleCheckbox() {
    setCheckbox(checkbox);
  }

  return (
    <section className="saved-movies">
      <div className="movies__container">
      <SearchForm
        handleCheckbox={handleCheckbox}
        checkbox={checkbox}
        onSubmit={onSubmit}
        error={error}
         />
        <MoviesCardList
        movies={checkbox ? movies : movies.filter(movie => movie.duration <= 40)}
        onDelete={onDelete}
        emptyResult={emptyResult}
        preloader={preloader}
        isLiked={isLiked}
          />
      </div>
    </section>
  )
}
export default SavedMovies