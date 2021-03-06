import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import Login from '../Pages/Login.js'
import Auth from '../Pages/Auth.js'
import Home from '../Pages/Home.js'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from '../components/Navbar'

/**
 * Requests to verify the user's token on the backend
 */
const VERIFY_USER = gql`
  query VerifyQuery($token: String!) {
    verifyUser(token: $token) {
      _id
      netid
      token
      recentUpdate
    }
  }
`

/**
 * This simply fetches from our cache whether a recent update has occurred
 */
const GET_RECENT_UPDATE = gql`
  query GetRecentUpdate {
    recentUpdate @client
  }
`

/**
 * Defines a private route - if the user is NOT logged in or has an invalid token,
 * then we redirect them to the login page.
 */
const PrivateRoute = ({ children, ...rest }) => {
  let token =
    localStorage.getItem('token') != null ? localStorage.getItem('token') : ''

  let client = useApolloClient()

  // Verify that the token is valid on the backend
  let { data, loading, error } = useQuery(VERIFY_USER, {
    variables: { token: token },
    errorPolicy: 'none',
  })

  if (error) {
    // Clear the token because something is wrong with it
    localStorage.removeItem('token')
    // Redirect the user to the login page
    return <Redirect to='login' />
  }
  if (loading) return <p>Waiting...</p>
  if (!data || !data.verifyUser) {
    // Clear the token
    localStorage.removeItem('token')
    // Redirect the user
    return <Redirect to='login' />
  }

  // Check whether any recent updates have come in
  let { recentUpdate } = data.verifyUser

  // Upon verification, store the returned information
  client.writeQuery({
    query: GET_RECENT_UPDATE,
    data: { recentUpdate: recentUpdate },
  })

  // Everything looks good! Now let's send the user on their way
  return (
    <Route
      {...rest}
      render={(props) => {
        return children
      }}
    />
  )
}

/**
 * Defines all the routes for our system.
 * @param {*} param0
 */
export const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/home'} component={Home} />
        <PrivateRoute path={'/auth'} component={Auth} />
        <Route path={'/login'} component={Login} />
      </Switch>
    </Router>
  )
}
