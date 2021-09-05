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
const [findNothing, setFindNothing] = useState(false);
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
      setTimeout(()=>{setErrorText({text: ""})}, 5000);
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
        console.log("Функция логина")
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
      setTimeout(()=>{setErrorText({text: ""})}, 5000);
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
    setTimeout(()=>{setErrorText({text: ""})}, 5000);
    });
}

function tokenCheck() {
  if (localStorage.getItem('loggedIn')) {
    MainApi.checkToken().then((res) => {
      console.log('TokenChecked');
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
  localStorage.removeItem('loggedIn');
  setUserData({ email: '', name: '', })
  history.push('/');
}

useEffect(() => {
  if (localStorage.getItem("MOVIES_ARRAY")){
    setAllMovies(localStorage.getItem("MOVIES_ARRAY"))
  }
}, []);


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
      console.log('3')
      setAllMovies(moviesArray)
      localStorage.setItem("MOVIES_ARRAY", JSON.stringify(moviesArray));
    })
    .catch(() => {
      localStorage.removeItem("MOVIES_ARRAY");
      console.log("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.");
      setErrorText({text: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."});
      setTimeout(()=>{setErrorText({text: ""})}, 5000);
    });
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
    setTimeout(()=>{setErrorText({text: ""})}, 5000);
    console.log('Error');
    setPreloader(false);
    return}
}

useEffect(() => {
  setAllMovies(JSON.parse(localStorage.getItem("MOVIES_ARRAY")));

}, []);

function arrIterating(array, str){
  for (let i = 0; i < array.length; i++) {
    str.includes( array[i] );
    console.log(str);
    console.log(array[i]);
  }
}
//includes ругает

function moviesSearch(request){
  let newArr;
  const handleRequest = requestConverter(request);
  setPreloader(true);
  if (!localStorage.getItem("MOVIES_ARRAY")){
    getAllMovies()
    console.log('1')
    console.log(allMovies)
    setAllMovies(JSON.parse(localStorage.getItem("MOVIES_ARRAY")));
    console.log(allMovies)
    console.log('2')
  }
  else {
    setAllMovies(JSON.parse(localStorage.getItem("MOVIES_ARRAY")));
  }
  console.log(handleRequest)


  /*newArr = allMovies.filter((item) => {
    return regex.test(item.nameRU) || regex.test(item.nameEN) || regex.test(item.director) || regex.test(item.country)
  })*/
  newArr = allMovies.filter((item) => {
    return arrIterating(handleRequest, item.nameRU) || arrIterating(handleRequest, item.director) || arrIterating(handleRequest, item.country)
  })
  console.log(newArr)
  if (newArr.length!==0){
  localStorage.setItem('MOVIES_FIND', JSON.stringify(newArr));
  setMovies(newArr);
  console.log('Вызов функции поиска')
  setPreloader(false);
  }
  else {
  localStorage.removeItem('MOVIES_FIND');
  setFindNothing(true);
  setPreloader(false);
  }
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
                error={errorText}
                emptyResult={findNothing}
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
                error={errorText}
                emptyResult={findNothing}
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