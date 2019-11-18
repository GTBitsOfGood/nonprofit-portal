import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import cookie from 'js-cookie';
import { withSnackbar } from 'notistack';
import { login, verifyToken } from '../frontend/actions/users';
import '../frontend/static/style/Login.css';
import config from '../config';


class LoginPage extends React.PureComponent {
  static async getInitialProps(ctx) {
    // eslint-disable-next-line global-require
    const token = ctx.res ? require('next-cookies')(ctx).token : cookie.get('token');

    return verifyToken(token)
      .then(async () => {
        if (ctx.res) {
          ctx.res.writeHead(302, {
            Location: config.pages.view,
          });
          ctx.res.end();
        } else {
          await Router.push(config.pages.view);
        }
      })
      .catch(() => ({}));
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const { enqueueSnackbar, closeSnackbar } = this.props;
    const { email, password } = this.state;

    await login(email, password)
      .then(async () => {
        closeSnackbar(this.errorKey);
        this.errorKey = null;

        await Router.push({
          pathname: config.pages.view,
        });
      })
      .catch((e) => {
        if (this.errorMessage !== e.message) {
          closeSnackbar(this.errorKey);
          this.errorKey = null;
        }

        if (this.errorKey == null) {
          this.errorMessage = e.message;
          this.errorKey = enqueueSnackbar(e.message, {
            variant: 'error',
            persist: true,
          });
        }
      });
  };

  render() {
    const { email, password } = this.state;

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
      </div>
    );
  }
}

LoginPage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(LoginPage);
