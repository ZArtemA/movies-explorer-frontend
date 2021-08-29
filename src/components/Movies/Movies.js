import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ handleCheckbox, checkbox, movies, onSubmit, onSave, onDelete, preloader }) {
return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm handleCheckbox={handleCheckbox} checkbox={checkbox} onSubmit={onSubmit} />
        {preloader && (<Preloader />)}
        <MoviesCardList
        movies={movies}
        onSave={onSave}
        onDelete={onDelete}
        />
      </div>
    </section>
  )
}
export default Movies