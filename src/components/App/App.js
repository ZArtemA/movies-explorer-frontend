import { React, useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import './App.css';
import MainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);//Авторизован
  const [userData, setUserData] = useState({ email: '', name: '' });//Данные юзера


const [checkbox, setCheckbox] = useState(true);//Кнопка чекбокса короткометражек
const [headerMenu, setHeaderMenu] = useState(false);//Открывание меню хедера
const [editForm, setEditForm] = useState(false);//Открыть форму изменения данных

const [allMovies, setAllMovies] = useState([]);//Все фильмы
const [movies, setMovies] = useState([]);//Поиск по фильмам
const [savedMovies, setSavedMovies] = useState([]);//Все сохраненные фильмы
const [findSavedMovies, setFindSavedMovies] = useState([]);//Поиск по сохраненным фильмам
const [preloader, setPreloader] = useState(false);//Прелоадер крутится - загрузка мутится
const [errorText, setErrorText] = useState({text: ""});
const [successText, setSuccessText] = useState({text: ""});
const [findNothing, setFindNothing] = useState(false);
const [addCards, setAddCards] = useState(setCountCard('step'));
const history = useHistory();

function handleCheckbox() {
  setCheckbox(!checkbox);
}

function handleNavMenuClick() {
  setHeaderMenu(true)
}
function handleEditBtnClick() {
  setEditForm(true)
}

function closeAll() {
  setHeaderMenu(false)
  setEditForm(false)
  setErrorText({text: ""})
}

useEffect(() => {
  window.addEventListener("resize", setCountCard);
}, []);

function handleRegister(email, password, name) {
  MainApi.register(email, password, name)
    .then((res) => {
      if (res) {handleLogin(email, password);
        console.log(res);
        console.log("Функция регистрации");
      }
    })
    .then(() => history.push('/movies'))
    .catch(error => {
      if (error === 409) {
        setErrorText({text: "Такой email уже существует"});
      } 
      else {
        setErrorText({text: "Что-то пошло не так!"});
      }
      setTimeout(()=>{setErrorText({text: ""})}, 4000);
    });
}


function handleLogin({ email, password }) {
  MainApi.authorize(email, password)
    .then((res) => {
      if (res) {
        setLoggedIn({
          loggedIn: true
        });
        localStorage.setItem('loggedIn', 'true');
        history.push("/movies");
      }
      tokenCheck();
    })
    .catch(error => {
      if (error === 401) {
        setErrorText({text: "Неправильные почта или пароль"});
      }
      else {
        setErrorText({text: "Что-то пошло не так!"});
      }
      setTimeout(()=>{setErrorText({text: ""})}, 4000);
    });
}

function handleUpdateUser({ email, name }) {
  MainApi.patchPersonInfo(name, email)
    .then((result) => {
      setUserData({
        name: result.name,
        email: result.email,
      })
      setSuccessText({text: "Данные изменены"});
      setTimeout(()=>{closeAll()}, 2000);
      setTimeout(()=>{setSuccessText({text: ""})}, 2000);
    })
    .catch(error => { 
      if (error === 409) {
        setErrorText({text: "Такой email уже зарегистрирован"});
      }
      else {
      setErrorText({text: "Что-то пошло не так!"});
    }
    setTimeout(()=>{setErrorText({text: ""})}, 4000);
    });
}

function tokenCheck() {
  if (localStorage.getItem('loggedIn')) {
    MainApi.checkToken().then((res) => {
      if (res) {
        setLoggedIn({
          loggedIn: true,
        });
        setUserData({ email: res.email, name: res.name });
        localStorage.setItem('loggedIn', 'true');
      };
    })
      .catch((error) => {
        if (error===401){
        console.log(`Токен не верен`)
        MainApi.quit();
        }
        else {
          console.log(`Ошибка проверки токена: ${error}`)
        }
      })
    }
}

useEffect(() => {
  tokenCheck();
}, []);



function LogOut() {
  MainApi.quit();
  setLoggedIn(false);
  localStorage.removeItem('MOVIES_ARRAY');
  localStorage.removeItem('MOVIES_FIND');
  localStorage.removeItem('SAVED_MOVIES');
  localStorage.removeItem('SAVED_MOVIES_FIND');
  localStorage.removeItem('FIND_NOTHING');
  localStorage.removeItem('loggedIn');
  setMovies([]);
  setSavedMovies([]);
  setFindSavedMovies([]);
  setFindNothing(false);
  setUserData({ email: '', name: '', })
  history.push('/');
}


function getAllMovies() {
  MoviesApi
    .getMovies()
    .then((res) => {
      const moviesArray = res.map((item) => {
        return {
          image: `https://api.nomoreparties.co${item.image.url}`,
          trailer: item.trailerLink,
          thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
          country: item.country,
          director: item.director,
          duration: item.duration,
          year: item.year,
          description: item.description,
          nameEN: item.nameEN,
          nameRU: item.nameRU,
          movieId: item.id,
        };
      });
      setAllMovies(moviesArray)
      localStorage.setItem("MOVIES_ARRAY", JSON.stringify(moviesArray));
      return moviesArray;
    })
    .catch(() => {
      localStorage.removeItem("MOVIES_ARRAY");
      console.log("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.");
      setErrorText({text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."});
      setTimeout(()=>{setErrorText({text: ""})}, 4000);
    });
}

function getSavedMovies(){
  MainApi
  .getInitialCards()
  .then((res) => {
    console.log(res)
    const newArr = res.map((item) => {
      return { ...item, id: item.movieId };
    });
    setSavedMovies(newArr)
    localStorage.setItem('SAVED_MOVIES', JSON.stringify(newArr));
  }).catch(()=>{
    localStorage.removeItem('SAVED_MOVIES');
    setErrorText({text: "Проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."});
  })
}

function requestConverter(request){
  let result;
  const space = ' ';
  const string = (JSON.stringify(request).replace(/[{}:,."]/g, "").replace(/movie/g, "")).toLowerCase();
  if (string.length > 0){
    result = string.split(space);
    return result;
  } else {
    setErrorText({text: "Нужно ввести ключевое слово"});
    setTimeout(()=>{setErrorText({text: ""})}, 4000);
    setPreloader(false);
    return}
}

useEffect(() => {
  if (loggedIn){
    if (localStorage.getItem('MOVIES_ARRAY')){
      setAllMovies(JSON.parse(localStorage.getItem('MOVIES_ARRAY')));
    }
    else{
      getAllMovies()
    }
    if (localStorage.getItem('SAVED_MOVIES')){
      setSavedMovies(JSON.parse(localStorage.getItem('SAVED_MOVIES')));
    }
    else{
      getSavedMovies()
    }
    if (localStorage.getItem('MOVIES_FIND')){
      setMovies(JSON.parse(localStorage.getItem('MOVIES_FIND')));
    }
    if (localStorage.getItem('FIND_NOTHING')){
      setFindNothing(true);
    }
  }
}, [loggedIn]);

function arrIterating(array, str){
  if (str !==null  && array !==undefined){
    for (let i = 0; i < array.length; i++) {
      let res;
      res = str.toLowerCase().includes(array[i]);
      if (res === true){
        return res
      }
    }
    return 
  }
  else {
    return
  }
}


function Search(movie, request){
  const Arr = movie.filter((item) => {
    return (arrIterating(request, item.nameRU) || arrIterating(request, item.nameEN) || arrIterating(request, item.director) || arrIterating(request, item.country))
  })
  return Arr;
}


function moviesSearch(request){
  if (request.movie !== '' && request.movie !== undefined){
    setPreloader(true);
    setMovies([]);
  const handleRequest = requestConverter(request);
  setTimeout(()=>{
    if (Search(allMovies, handleRequest).length!==0){
        localStorage.setItem('MOVIES_FIND', JSON.stringify(Search(allMovies, handleRequest)));
        setMovies(Search(allMovies, handleRequest));
        localStorage.removeItem('FIND_NOTHING')
        setFindNothing(false);
        setPreloader(false);
      }
      else {
        setMovies([]);
        localStorage.removeItem('MOVIES_FIND');
        setFindNothing(true);
        localStorage.setItem('FIND_NOTHING', true)
        setPreloader(false);
      }    
  }, 3000)
    } else {
      setErrorText({text: "Нужно ввести ключевое слово"});
      setTimeout(()=>{setErrorText({text: ""})}, 4000);
      console.log('error')
      }
}

function savedMoviesSearch(request){
  if (request.movie !== '' && request.movie !== undefined){
    setPreloader(true);
    setFindSavedMovies([]);
  const handleRequest = requestConverter(request);
  setTimeout(()=>{
    if (Search(savedMovies, handleRequest).length!==0){
        localStorage.setItem('SAVED_MOVIES_FIND', JSON.stringify(Search(savedMovies, handleRequest)));
        setFindSavedMovies(Search(savedMovies, handleRequest));
        localStorage.removeItem('FIND_NOTHING')
        setFindNothing(false);
        setPreloader(false);
      }
      else {
        setFindSavedMovies([]);
        localStorage.removeItem('SAVED_MOVIES_FIND');
        setFindNothing(true);
        localStorage.setItem('FIND_NOTHING', true)
        setPreloader(false);
      }    
  }, 3000)
    } else {
      setErrorText({text: "Нужно ввести ключевое слово"});
      setTimeout(()=>{setErrorText({text: ""})}, 4000);
      console.log('error')
      }
}

function addMovie(movie) {
  console.log(movie)
  MainApi.addCard(movie)
    .then((newCard) => {
      setSavedMovies([...savedMovies, newCard]);
      localStorage.setItem('SAVED_MOVIES', JSON.stringify(savedMovies))
    })
    .catch((error) => {
      console.log(`На сервере произошла ошибка: ${error}`);
    });
}

function deleteMovie(movie) {
  const id = savedMovies.find((card) => card.movieId === movie.id).movieId;
  MainApi.removeCard(id)
    .then(() => {
      setSavedMovies(savedMovies => savedMovies.filter((state) => state.id !== id));
    })
    .catch((error) => {
      console.log(`На сервере произошла ошибка: ${error}`);
    });
}

function isLiked(movie) {
  return savedMovies.some((item) => item.movieId === movie.id);
}

function setCountCard(string) {
  let cardsArr = 0;
  let addCards = 0;
  const pageWidth = document.documentElement.scrollWidth;

  if (pageWidth > 520) {
    cardsArr = 7;
    addCards = 7;
  }
  else {
    cardsArr = 5;
    addCards = 2;
  }
  if (string === 'step') {
    return cardsArr
  } else {
    return addCards
  }
}


function handleMoreButton() {
  setAddCards(addCards + setCountCard('plus'));
}

    return (
      <CurrentUserContext.Provider value={userData}>
        <>
        <main className="app">
            <Switch>
              <Route exact path="/">
              <Header 
            loggedIn={loggedIn}
            isOpen={headerMenu}
            onClose={closeAll}
            onMenuBtnClick={() =>{handleNavMenuClick()}}
            />
                <Main />
                <Footer />
              </Route>
              <ProtectedRoute path="/movies" loggedIn={loggedIn}>
              <Header 
            loggedIn={loggedIn}
            isOpen={headerMenu}
            onClose={closeAll}
            onMenuBtnClick={() =>{handleNavMenuClick()}}
            />
                <Movies
                handleCheckbox={handleCheckbox}
                checkbox={checkbox}
                movies={movies}
                onSubmit={moviesSearch}
                onSave={(movie) => { addMovie(movie) }}
                onDelete={(movie) => { deleteMovie(movie) }}
                preloader={preloader}
                error={errorText}
                emptyResult={findNothing}
                addCards={addCards}
                handleMoreBtn={handleMoreButton}
                isLiked={isLiked}
                 />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
              <Header 
            loggedIn={loggedIn}
            isOpen={headerMenu}
            onClose={closeAll}
            onMenuBtnClick={() =>{handleNavMenuClick()}}
            />
                <SavedMovies 
                handleCheckbox={handleCheckbox}
                checkbox={checkbox}
                movies={findSavedMovies === 0 ? findSavedMovies : savedMovies}
                onSubmit={savedMoviesSearch}
                onDelete={(movie) => {deleteMovie(movie)}}
                preloader={preloader}
                error={errorText}
                emptyResult={findNothing}
                isLiked={isLiked}
                />
                <Footer />
              </ProtectedRoute>
              <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <Header 
            loggedIn={loggedIn}
            isOpen={headerMenu}
            onClose={closeAll}
            onMenuBtnClick={() =>{handleNavMenuClick()}}
            />
                <Profile
            userData={userData}
            isOpen={editForm}
            onEditBtnClick={handleEditBtnClick}
            onSave={handleUpdateUser}
            onClose={closeAll}
            onLogOut={()=>{LogOut()}}
            error={errorText}
            success={successText}
                />
              </ProtectedRoute>
              <Route path="/signup">
                <Register
                handleRegister={handleRegister}
                error={errorText}
                />
              </Route>
              <Route path="/signin">
                <Login
                handleLogin={handleLogin}
                error={errorText}
                />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
              </Switch>
        </main>
        </>
        </CurrentUserContext.Provider>
    );
  }
  
  export default App;