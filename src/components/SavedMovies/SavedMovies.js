import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ handleCheckbox, checkbox, movies, onSubmit, onDelete, preloader  }) {
return (
    <section className="saved-movies">
      <div className="movies__container">
        <SearchForm handleCheckbox={handleCheckbox} checkbox={checkbox} onSubmit={onSubmit} />
        {preloader && (<Preloader />)}
        <MoviesCardList
        movies={movies}
        onClick={onDelete}
          />
      </div>
    </section>
  )
}
export default SavedMovies