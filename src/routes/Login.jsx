import React, { Component } from 'react';
import store from '../state/store.js'
import { login } from '../state/actions/user.js'
import history from '../history';
import { getWindowQueryValue } from '../helpers.js'

import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.username = null
    this.password = null
    this.submitLogin = this.submitLogin.bind(this)
    this.redirect = getWindowQueryValue('redirect-to')
  }

  submitLogin(evt) {
    evt.preventDefault()
    const data = {
      email: this.username.value,
      password: this.password.value
    }

    fetch('https://5c505db9ee97f600140480dd.mockapi.io/auth', {
      method: 'POST',
      headers: {
            "Content-Type": "application/json",
        },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((json) => {
      // TODO: Api always returns sucess but we should catcer for failures
      store.dispatch(login(json.user, json.token))
    })
    .then(() => {
      const url = this.redirect || '/'
      return history.push(url)
    })
    .catch((err) => {
      // TODO: Add better error handling
      console.log(err)
    })

  }


  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form action="POST" onSubmit={(evt) => this.submitLogin(evt)} className="Login__form">
          <div className="Login__form-input-wrapper">
            <label htmlFor="username">Username</label>
            <input id="username" ref={(c) => { this.username = c }} type="text"/>
          </div>
          <div className="Login__form-input-wrapper">
            <label htmlFor="password">Password</label>
            <input id="password" ref={(c) => { this.password = c }} type="password"/>
          </div>
          <button className="button Login__button" type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login;
