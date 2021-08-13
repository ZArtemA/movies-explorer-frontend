import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import Register from './Register/Register';
import Login from './Login/Login';
import PageNotFound from './PageNotFound/PageNotFound';
import Footer from './Footer/Footer';

function App() {

  
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <>
        <div className="app">
            <Header />
            <Switch>
              <Route path="/" loggedIn={loggedIn}>
                <Main />
              </Route>
              <Route path="/movies" loggedIn={loggedIn}>
                <Movies />
              </Route>
              <Route path="/saved-movies" loggedIn={loggedIn}>
                <SavedMovies />
              </Route>
              <Route path="/profile" loggedIn={loggedIn}>
                <Profile />
              </Route>
              <Route path="/signup">
                <Register />
              </Route>
              <Route path="/signin">
                <Login />
              </Route>
              <Route path="/*">
                <PageNotFound />
              </Route>
            </Switch>
            <Footer />
        </div>
        </>
      </CurrentUserContext.Provider>
    );
  }
  
  export default App;