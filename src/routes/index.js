import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from '../components/Luna_Full_Version_HTML/login';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Login} />
      </Switch>
    </BrowserRouter>
  )
};
export default Routes;