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


function handleSignOut() {
  localStorage.removeItem('token');
  setLoggedIn(false);
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
            onSignOut={()=>{handleSignOut()}}
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
                <Register />
              </Route>
              <Route path="/signin">
                <Login />
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