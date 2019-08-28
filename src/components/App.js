import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

// Helpers
import * as auth from '../api/auth'
import * as token from '../helpers/local-storage'

// Components
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null,
      currentName: null,
      loading: true,
      displayError: false,
      admin: false
    }

    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
  }

  async componentDidMount () {
    // window.localStorage.removeItem('journal-app')
    if (token.getToken()) {
      const { user } = await auth.profile();
      this.setState({ 
        currentUserId: user._id, 
        currentName: user.first_name,
        admin: user.admin,
        loading: false 
      });
    } else {
      this.setState({ loading: false })
    }
  }

  async loginUser (user) {
    const response = await auth.login(user)
    if (response.status === 401) {
      this.setState({displayError: true})
      return
    } else {
      this.setState({displayError: false})
      await token.setToken(response)
      
      const profile = await auth.profile()
      this.setState({ 
        currentUserId: profile.user._id,
        currentName: profile.first_name,
        admin: profile.admin
      })
    }
  }

  logoutUser () {
    token.clearToken()
    this.setState({ 
      currentUserId: null,
      currentName: null,
      admin: null
    })
  }

  async signupUser (user) {
    const response = await auth.signup(user)
    if (response.status === 401) {
      this.setState({displayError: true})
      return
    } else {
      this.setState({displayError: false})
      await token.setToken(response)
      
      const profile = await auth.profile()
      this.setState({ 
        currentUserId: profile.user._id,
        currentUsername: profile.name,
      })
    }  
  }

  render () {
    const { currentUserId, currentName, loading, displayError, admin } = this.state
    if (loading) return <span>Loading...</span>

    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={currentUserId}
          currentName={currentName}
          logoutUser={this.logoutUser} 
          admin={admin}/>
        <Switch>
          <Route path='/login' exact component={() => {
            return currentUserId ? <Redirect to='/users' /> : <Login onSubmit={this.loginUser} displayError={displayError} />
          }} />
          <Route path='/signup' exact component={() => {
            return currentUserId ? <Redirect to='/users' /> : <Signup onSubmit={this.signupUser} displayError={displayError}/>
          }} />

          <Route path='/users' render={() => {
            return currentUserId
              ? <UsersContainer currentUserId={currentUserId} admin={admin} />
              : <Redirect to='/login' />
          }} />

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App
