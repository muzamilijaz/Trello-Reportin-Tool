/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../components/Hoc/auth'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component  {...props} />
        }
        else {
          return <Redirect to={'/'} />
        }
      }}

    />
  )
}

export default ProtectedRoute
