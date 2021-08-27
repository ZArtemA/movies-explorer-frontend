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

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [currentUser, setCurrentUser] = useState([]);
  const history = useHistory();


const [checkbox, setCheckbox] = useState(true);
const [headerMenu, setHeaderMenu] = useState(false);
const [editForm, setEditForm] = useState(false);

useEffect(() => {
  if (loggedIn) {
  Promise.all([
    MainApi.getPersonInfo(),
    MainApi.getInitialCards()
  ])
    .then((result) => {
      const [ownerInfo, cardsArray] = result;
      setCurrentUser({
        name: ownerInfo.name,
        about: ownerInfo.about,
        avatar: ownerInfo.avatar,
        id: ownerInfo.id
      })
      setMovies(cardsArray)
    })
    .catch((error) => {
      console.log(`Ошибка получения данных: ${error}`);
    });
  }
}, [loggedIn])


function handleRegister(email, password, name) {
  MainApi.register(email, password, name)
    .then(() => history.push('/sign-in'))
    .catch((error) => {
      console.log(`Ошибка: ${error}`)
    })
}


function handleLogin({ email, password }) {
  MainApi.authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        setUserData({ email: email, password: password, })
        MainApi.updateToken();
        setLoggedIn({
          loggedIn: true
        });
        history.push("/movies");
        return loggedIn;
      }
    })
    .catch(error => {
      if (error === 401) {
        return console.log(`Пользователь с таким email не найден: ${error}`);
      }
      if (error === 400) {
        return console.log(`Не передано одно из полей: ${error}`);
      }
      console.log(`Ошибка: ${error}`);
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
        history.push("/");
      }
    })
      .catch((error) => {
        console.log(`Ошибка проверки токена: ${error}`)
      })
  }
}

tokenCheck();

function LogOut() {
  localStorage.removeItem('token');
  setLoggedIn(false);
  setUserData({ email: '', name: '', })
  history.push('/sign-in');
}



function handleCheckbox() {
    setCheckbox(!checkbox);
  }

  function handleNavMenuClick() {
    setHeaderMenu(true)
  }
  function handleEditBtnClick() {
    setEditForm(true)
  }

  function handleSaveBtnClick() {
    setEditForm(false)
  }


  function closeAll() {
    setHeaderMenu(false)
    setEditForm(false)
  }


  
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <>
        <main className="app">
            <Switch>
              <Route exact path="/">
              <Header 
            userData={userData}
            isOpen={headerMenu}
            onClose={closeAll}
            onMenuBtnClick={() =>{handleNavMenuClick()}}
            />
                <Main />
                <Footer />
              </Route>
              <Route path="/movies">
              <Header 
            isOpen={headerMenu}
            onClose={closeAll}
            onMenuBtnClick={() =>{handleNavMenuClick()}}
            onSignOut={()=>{LogOut()}}
            />
                <Movies
                handleCheckbox={handleCheckbox}
                checkbox={checkbox}
                movies={movies}
                 />
                <Footer />
              </Route>
              <Route path="/saved-movies">
              <Header 
            isOpen={headerMenu}
            onClose={closeAll}
            onMenuBtnClick={() =>{handleNavMenuClick()}}
            />
                <SavedMovies />
                <Footer />
              </Route>
              <Route path="/profile">
              <Header 
            isOpen={headerMenu}
            onClose={closeAll}
            onMenuBtnClick={() =>{handleNavMenuClick()}}
            />
                <Profile
             isOpen={editForm}
             onEditBtnClick={() =>{handleEditBtnClick()}}
             onSave={() =>{handleSaveBtnClick()}}
             onClose={closeAll}
                />
              </Route>
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