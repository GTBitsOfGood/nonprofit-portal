import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { login } from '../frontend/actions/users';
import '../frontend/static/style/Login.css';
import config from '../config';


class LoginPage extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { token } = nextCookie(ctx);

    const jwt = require('jsonwebtoken');
    let isValid = true;
    try {
      jwt.verify(token, 'secret');
    } catch (e) {
      isValid = false;
    }

    if (isValid) {
      if (typeof window === 'undefined') {
        ctx.res.writeHead(302, {
          Location: config.pages.view,
        });
        ctx.res.end();
      } else {
        await Router.push(config.pages.view);
      }
    }

    return {
      token,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
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

  submitForm = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;

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
  };

  render() {
    const {
      email, password, error,
    } = this.state;

    return (
      <div className="LoginContainer">
        <h1>Login</h1>
        <form
          className="LoginForm"
          onSubmit={this.submitForm}
        >
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
          <button type="submit">Submit</button>
        </form>
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
