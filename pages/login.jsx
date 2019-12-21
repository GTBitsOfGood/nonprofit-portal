import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { login, verifyToken } from '../frontend/actions/users';
import {
  addNotification as addNotificationBase,
  deleteNotification as deleteNotificationBase,
} from '../frontend/redux/actions/notificationActions';
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
            Location: config.pages.admin,
          });
          ctx.res.end();
        } else {
          await Router.push(config.pages.admin);
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

    this.errorKeys = [];
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    const { addNotification, deleteNotification } = this.props;
    const { email, password } = this.state;

    await login(email, password)
      .then(async () => {
        if (this.errorKeys.length > 0) {
          deleteNotification(this.errorKeys);
        }

        await Router.push({
          pathname: config.pages.admin,
        });
      })
      .catch(async (e) => {
        const { payload } = await addNotification({
          header: e.message,
          body: 'Please try again.',
          type: 'error',
        });

        this.errorKeys.push(payload.key);
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
  addNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

export default connect(null, {
  addNotification: addNotificationBase,
  deleteNotification: deleteNotificationBase,
})(LoginPage);
