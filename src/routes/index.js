import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from '../components/Luna_Full_Version_HTML/login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../components/Luna_Full_Version_HTML/Dashboard';
import Reporting from '../components/Luna_Full_Version_HTML/Reporting';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/reports' component={Reporting} />
        {/* <ProtectedRoute exact path='/dashboard' component={Dashboard} /> */}
        <Route path="*" component={() => '405 error found'} />
      </Switch>
    </BrowserRouter>
  )
};
export default Routes;