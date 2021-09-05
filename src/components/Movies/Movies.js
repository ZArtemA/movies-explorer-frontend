import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ handleCheckbox, checkbox, movies, onSave, onSubmit, onDelete, preloader, error, emptyResult, addCards, handleMoreBtn }) {
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
        movies={movies}
        onSave={onSave}
        onDelete={onDelete}
        emptyResult={emptyResult}
        preloader={preloader}
        addCards={addCards}
        handleMoreBtn={handleMoreBtn}
        />
      </div>
    </section>
  )
}
export default Movies