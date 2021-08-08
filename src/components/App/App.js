import React from 'react';

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