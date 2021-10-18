/* eslint-disable react/display-name */

import { AuthProvider } from './contexts/authContext'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Dashboard } from './Pages/Dashboard'
import { Login } from './Pages/Login'
import { authAPI } from './services/auth.service'
import { UserEdit } from './Pages/Users/UserEdit'
import { UserList } from './Pages/Users/UserList'

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
const App = () => {
  const auth = useAuth()
  console.log(auth.isAuthenticated)
  return (
    <BrowserRouter>
      {
        auth.isAuthenticated
          ? (<PrivateRoutes />)
          : (<PublicRoutes />)
      }
    </BrowserRouter>
  )
}
const PublicRoutes = () => {
  console.log('PUBLIC_ROUTES')
  return (
    <>
      <Switch>
        <Route exact path='/' render={(props) => (<Login {...props} />)} default />
        <Route path='*' >
          <Redirect push to='/' />
        </Route>
      </Switch>
    </>
  )
}

const PrivateRoutes = () => {
  console.log('PRIVATE_ROUTES')
  authAPI.initInterceptors()
  return (
    <>
      <Switch>
        <Route exact path='/' render={(props) => <Dashboard {...props} />} default />
        <Route exact path='/usuarios' render={(props) => <UserList {...props} />} />
        <Route exact path='/usuarios/:id' render={(props) => <UserEdit {...props} />} />
        <Route path='*' >
          <Redirect push to='/' />
        </Route>
      </Switch>
    </>
  )
}
