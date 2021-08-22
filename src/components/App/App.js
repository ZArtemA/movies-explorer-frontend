import { React, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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

function App() {

const [checkbox, setCheckbox] = useState(true);
const [headerMenu, setHeaderMenu] = useState(false);
const [editForm, setEditForm] = useState(false);

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
  }


  
    return (
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
            />
                <Movies
                handleCheckbox={handleCheckbox}
                checkbox={checkbox}
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
             onSaveBtnClick={() =>{handleSaveBtnClick()}}
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
    );
  }
  
  export default App;