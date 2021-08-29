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
}

useEffect(() => {
  if (loggedIn) {
  Promise.all([
    MainApi.getPersonInfo(),
    MainApi.getInitialCards(),
  ])
    .then((result) => {
      const [ownerInfo, cardsArray] = result;
      setUserData({
        name: ownerInfo.name,
        email: ownerInfo.email,
      })
      setSavedMovies(cardsArray)
    })
    getAllMovies()
    JSON.parse(localStorage.getItem('moviesFind'))
    JSON.parse(localStorage.getItem('savedMoviesFind'))
    .catch((error) => {
      console.log(`Ошибка получения данных: ${error}`);
    });
  }
}, [loggedIn])

function handleRegister(email, password, name) {
  MainApi.register(email, password, name)
    .then((res) => {
      if (res) {handleLogin(email, password);}
    })
    .then(() => history.push('/movies'))
    .catch((err) => {
      if (err.status === 409) {
        console.log('Такой email уже существует');
      } else {
        console.log('Что-то пошло не так! Попробуйте ещё раз.');
      }
    });
}


function handleLogin({ email, password }) {
  MainApi.authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUserData({ email: email, password: password, })
        setLoggedIn({
          loggedIn: true
        });
        history.push("/movies");
        return loggedIn;
      }
    })
    .catch(error => {
      if (error === 400) {
        return console.log(`Неверный email или пароль`);
      }
      else {
        return console.log(`Что-то пошло не так!`);
      }
    });
}

function handleUpdateUser(userData) {
  MainApi.patchPersonInfo(userData, localStorage.getItem('token'))
    .then((result) => {
      setUserData({
        name: result.name,
        email: result.email,
      })
      closeAll();
    })
    .catch((error) => { 
      if (error === 409) {
        return console.log(`Такой email уже зарегистрирован`);
      }
      else {
      console.log(`Что-то пошло не так!`);}
    });
}


function tokenCheck() {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    MainApi.checkToken(token).then((res) => {
      if (res) {
        setLoggedIn({
          loggedIn: true,
        });
        setUserData({ email: res.email, name: res.name,  });
      }
    })
      .catch((error) => {
        console.log(`Ошибка проверки токена: ${error}`)
      })
  }
}

useEffect(() => {
  tokenCheck();
}, []);

function LogOut() {
  localStorage.removeItem('token');
  setLoggedIn(false);
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

      localStorage.setItem("allMovies", JSON.stringify(moviesArray));
      setAllMovies(moviesArray);
    })
    .catch(() => {
      localStorage.removeItem("allMovies");
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
              <Header />
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
              <Header />
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
              <Header />
                <Profile
            userData={userData}
            isOpen={editForm}
            onEditBtnClick={handleEditBtnClick}
            onSave={handleUpdateUser}
            onClose={closeAll}
            onSignOut={()=>{LogOut()}}
                />
              </ProtectedRoute>
              <Route path="/signup">
                <Register
                handleRegister={handleRegister}
                />
              </Route>
              <Route path="/signin">
                <Login
                handleLogin={handleLogin}
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