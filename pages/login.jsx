import React from 'react';
import Router from 'next/router';
import { login, signUp } from '../frontend/actions/users';
import '../frontend/static/style/Login.css';
import config from '../config';


class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      username: '',
      password: '',
      error: null,
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  toggleType = () => {
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  };

  submitForm = async (event) => {
    event.preventDefault();

    const { isLogin, username, password } = this.state;

    if (isLogin) {
      await login(username, password)
        .then((res) => {
          if (!res.success) {
            this.setState({
              error: res.message,
            });
          } else {
            Router.push({
              pathname: config.pages.view,
            });
          }
        })
        .catch(() => {
          this.setState({
            error: 'There was an error, please try again later!',
          });
        });
    } else {
      await signUp(username, password)
        .then((res) => {
          if (!res.success) {
            this.setState({
              error: res.message,
            });
          } else {
            Router.push({
              pathname: config.pages.view,
            });
          }
        })
        .catch(() => {
          this.setState({
            error: 'There was an error, please try again later!',
          });
        });
    }
  };

  render() {
    const {
      isLogin, username, password, error,
    } = this.state;

    return (
        <div className="LoginContainer">
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form
            className="LoginForm"
            onSubmit={this.submitForm}
          >
            <label>Username</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={this.onChange}
              required
            />
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.onChange}
              required
            />
            <button type="submit">
              Submit
            </button>
          </form>
          <button
            type="button"
            onClick={this.toggleType}
          >
            {`Click to ${isLogin ? 'Sign Up' : 'Login'}`}
          </button>
          {(error != null) && (
            <div className="ErrorModal">
              <p>{error}</p>
            </div>
          )}
        </div>
    );
  }
}

export default LoginPage;
