import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ handleCheckbox, checkbox, movies, onSave, onSubmit, onDelete, preloader, error }) {
return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm
        handleCheckbox={handleCheckbox}
        checkbox={checkbox}
        onSubmit={onSubmit}
        error={error}
         />
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