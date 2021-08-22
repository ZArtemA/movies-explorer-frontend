import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ handleCheckbox, checkbox }) {
return (
    <section className="saved-movies">
      <div className="movies__container">
        <SearchForm handleCheckbox={handleCheckbox} checkbox={checkbox} />
        <MoviesCardList />
      </div>
    </section>
  )
}
export default SavedMovies