import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { login, signUp } from '../frontend/actions/users';
import '../frontend/static/style/Login.css';
import config from '../config';


class LoginPage extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { token } = nextCookie(ctx);

    if (token) {
      if (typeof window === 'undefined') {
        ctx.res.writeHead(302, {
          Location: config.pages.view,
        });
        ctx.res.end();
      } else {
        Router.push(config.pages.view);
      }
    }

    return {
      token,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      name: '',
      email: '',
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

    const {
      isLogin, name, email, password,
    } = this.state;

    if (isLogin) {
      await login(email, password)
        .then(() => {
          Router.push({
            pathname: config.pages.view,
          });
        })
        .catch((e) => {
          this.setState({
            error: e.message,
          });
        });
    } else {
      await signUp(name, email, password)
        .then(() => {
          Router.push({
            pathname: config.pages.view,
          });
        })
        .catch((e) => {
          this.setState({
            error: e.message,
          });
        });
    }
  };

  render() {
    const {
      isLogin, name, email, password, error,
    } = this.state;

    return (
      <div className="LoginContainer">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form
          className="LoginForm"
          onSubmit={this.submitForm}
        >
          {(!isLogin) && (
          <>
            <label>Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={this.onChange}
              required
            />
          </>
          )}
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={email}
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
