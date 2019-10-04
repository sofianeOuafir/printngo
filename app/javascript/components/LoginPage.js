import React from "react"
import axios from 'axios';

class LoginPage extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/v1/sessions', {
      email: 'sofiane.ouafir@live.fr',
      password: 'abc123'
    })
  }

  logout = () => {
    axios.delete('/api/v1/sessions/undefined')
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text"/>
        <input type="password"/>
        <button>Login</button>
        <a onClick={this.logout}>Logout</a>
      </form>
    );
  }
}

export default LoginPage
