import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { state, handleChange, handleSubmit } = this;
    const { email, password } = state
    return(
      <div className="Login">
        <form onSubmit={ handleSubmit }>
          <h1>Log In</h1>
          <input placeholder="email" value={ email } onChange={ handleChange } type="text" name="email"></input>
          <input placeholder="password" value={ password } onChange={ handleChange } type="text" name="password"></input>
          <button>GO</button>
        </form>
      </div>
    )
  }
}
