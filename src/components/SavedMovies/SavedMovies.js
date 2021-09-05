import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ handleCheckbox, checkbox, movies, onSubmit, onDelete, preloader, error, emptyResult  }) {
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
        movies={movies}
        onClick={onDelete}
        emptyResult={emptyResult}
        preloader={preloader}
          />
      </div>
    </section>
  )
}
export default SavedMovies