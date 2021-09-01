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
  const history = useHistory();


const [checkbox, setCheckbox] = useState(true);//Кнопка чекбокса короткометражек
const [headerMenu, setHeaderMenu] = useState(false);//Открывание меню хедера
const [editForm, setEditForm] = useState(false);//Открыть форму изменения данных

const [allMovies, setAllMovies] = useState([]);//Все фильмы
const [movies, setMovies] = useState([]);//Поиск по фильмам
const [savedMovies, setSavedMovies] = useState([]);//Все сохраненные фильмы
const [findSavedMovies, setFindSavedMovies] = useState([]);//Поиск по сохраненным фильмам
const [preloader, setPreloader] = useState(false);//Прелоадер крутится - загрузка мутится
const [errorText, setErrorText] = useState({text: ""});

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
    });
}


function handleLogin({ email, password }) {
  MainApi.authorize(email, password)
    .then((res) => {
      console.log(res)
      if (res) {
        tokenCheck()
        setLoggedIn({
          loggedIn: true
        });
        history.push("/movies");
        console.log("Функция логина")
        return loggedIn;
      }
    })
    .catch(error => {
      if (error === 401) {
        setErrorText({text: "Неправильные почта или пароль"})
      }
      else {
        setErrorText({text: "Что-то пошло не так!"});
      }
    });
}

function handleUpdateUser({ email, name }) {
  MainApi.patchPersonInfo(name, email)
    .then((result) => {
      setUserData({
        name: result.name,
        email: result.email,
      })
      closeAll();
      console.log(result);
    })
    .catch(error => { 
      if (error === 409) {
        setErrorText({text: "Такой email уже зарегистрирован"});
      }
      else {
      setErrorText({text: "Что-то пошло не так!"});
    }
    });
}

function tokenCheck() {
  if (document.cookie) {
    MainApi.checkToken().then((res) => {
      console.log('TokenChecked');
      if (res) {
        setLoggedIn({
          loggedIn: true,
        });
        setUserData({ email: res.email, name: res.name });
      };
        /*if (!localStorage.getItem("SAVED_MOVIES_ARRAY")) {
          MainApi.getInitialCards().then((result) => {
          setSavedMovies(result)
          localStorage.setItem("SAVED_MOVIES_ARRAY", JSON.stringify(result));
        })
        console.log('2-1');
      } else {
        setSavedMovies(JSON.parse(localStorage.getItem("SAVED_MOVIES_ARRAY")))
        console.log('2-2');}
        if (!localStorage.getItem("MOVIES_ARRAY")) {
          getAllMovies();
          console.log('3');
        };
        if (localStorage.getItem("MOVIES_SEARCH")) {
          setMovies(JSON.parse(localStorage.getItem("MOVIES_SEARCH")))
        };
        if (localStorage.getItem("SAVED_MOVIES_SEARCH")) {
          setFindSavedMovies(JSON.parse(localStorage.getItem("SAVED_MOVIES_SEARCH")))
        };*/
    })
      .catch((error) => {
        console.log(`Ошибка проверки токена: ${error}`)
        MainApi.quit();
        history.push("/");
      })
  }
}



useEffect(() => {
  tokenCheck();
}, []);

function LogOut() {
  MainApi.quit();
  setLoggedIn(false);
  localStorage.removeItem('token');
  localStorage.removeItem('moviesFind');
  localStorage.removeItem('savedMoviesFind');
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
          id: item.id,
        };
      });

      localStorage.setItem("MOVIES_ARRAY", JSON.stringify(moviesArray));
      setAllMovies(moviesArray);
    })
    .catch(() => {
      localStorage.removeItem("MOVIES_ARRAY");
      console.log("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
    });
}



function moviesSearch(request){
  setPreloader(true);
  const newArr = allMovies.filter((item) => {
    return item.nameRU.includes(request) || item.nameEN.includes(request) || item.director.includes(request) ||item.country.includes(request)
  })
  localStorage.setItem('moviesFind', JSON.stringify(newArr));
  setPreloader(false);
  setMovies(newArr);
}


function savedMoviesSearch(request){
  setPreloader(true);
  const newArr = savedMovies.filter((item) => {
    return item.nameRU.includes(request) || item.nameEN.includes(request) || item.director.includes(request) ||item.country.includes(request)
  })
  localStorage.setItem('savedMoviesFind', JSON.stringify(newArr));
  setPreloader(false);
  setFindSavedMovies(newArr);
}



function addMovie(movie) {
  MainApi.addCard(movie)
    .then((newCard) => {
      setSavedMovies(savedMovies => ([newCard, ...savedMovies]));
    })
    .catch((error) => {
      console.log(`На сервере произошла ошибка: ${error}`);
    });
}

function deleteMovie(movie) {
  MainApi.removeCard(movie._id)
    .then(() => {
      setSavedMovies(savedMovies => savedMovies.filter((state) => state._id !== movie._id));
    })
    .catch((error) => {
      console.log(`На сервере произошла ошибка: ${error}`);
    });
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
                onSave={addMovie}
                onDelete={deleteMovie}
                preloader={preloader}
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
                movies={savedMovies}
                onSubmit={savedMoviesSearch}
                onDelete={deleteMovie}
                preloader={preloader}
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