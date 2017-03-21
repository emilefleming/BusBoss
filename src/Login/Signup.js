import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
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
    const loginObj = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    axios.post('/api/users', loginObj)
      .then(response => {
        console.log(response);
        this.props.setUserData(response.data);
        this.props.history.push('/favorites');
      })
      .catch(err => {
        this.setState({ error: err.response.data })
      })
  }

  render() {
    const { state, handleChange, handleSubmit } = this;
    const { email, password, username, confirmPassword } = state;
    return(
      <div className="Login">
        <form onSubmit={ handleSubmit }>
          <h1>Sign Up</h1>
          <input
            placeholder="email"
            value={ email }
            onChange={ handleChange }
            type="text"
            name="email"
          />
          <input
            placeholder="username"
            value={ username }
            onChange={ handleChange }
            type="text"
            name="username"
          />
          <input
            placeholder="password"
            value={ password }
            onChange={ handleChange }
            type="password"
            name="password"
          />
          <input
            placeholder="confirm password"
            value={ confirmPassword }
            onChange={ handleChange }
            type="password"
            name="confirmPassword"
          />
          {
            this.state.error
            ? <div className="error">{ this.state.error }</div>
            : null
          }
          <button>GO</button>
        </form>
      </div>
    )
  }
}
