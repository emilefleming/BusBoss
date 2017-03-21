import React, { Component } from 'react';
import axios from 'axios';
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
    console.log(this.props);
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
      password: this.state.password
    }

    axios.post('/api/token', loginObj)
      .then(response => {
        this.props.setUserData(response.data);
        this.props.history.push('/favorites');
      })
      .catch(err => {
        this.setState({ error: err.response.data })
      })
  }

  render() {
    const { state, handleChange, handleSubmit } = this;
    const { email, password } = state
    return(
      <div className="Login">
        <form onSubmit={ handleSubmit }>
          <h1>Log In</h1>
          <input placeholder="email" value={ email } onChange={ handleChange } type="text" name="email"></input>
          <input placeholder="password" value={ password } onChange={ handleChange } type="password" name="password"></input>
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
