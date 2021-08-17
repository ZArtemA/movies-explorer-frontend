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

function handleCheckbox() {
    setCheckbox(!checkbox);
  }

  
    return (
        <>
        <div className="app">
            <Header />
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route path="/movies">
                <Movies
                handleCheckbox={handleCheckbox}
                checkbox={checkbox}
                 />
              </Route>
              <Route path="/saved-movies">
                <SavedMovies />
              </Route>
              <Route path="/profile">
                <Profile />
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
            <Footer />
        </div>
        </>
    );
  }
  
  export default App;