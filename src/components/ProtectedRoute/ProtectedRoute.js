import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({loggedIn, ...routeProps}) => {
    return loggedIn ? <Route {...routeProps} /> : <Redirect to="/"/>
  };

export default ProtectedRoute;