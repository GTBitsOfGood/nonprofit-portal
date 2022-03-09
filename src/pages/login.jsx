import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, useUser } from "../actions/users";
import {
  addNotification as addNotificationBase,
  deleteNotification as deleteNotificationBase,
} from "../redux/actions/notificationActions";
import "../static/style/Login.css";
import urls from "../utils/urls";

function LoginPage({ addNotification, deleteNotification }) {
  const { mutateUser } = useUser({
    redirectTo: urls.pages.admin,
    redirectIfFound: true,
  });
  const [errorKeys, setErrorKeys] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      mutateUser(await login(email, password));
      deleteNotification(...errorKeys);

      // await Router.push({
      //   pathname: config.pages.admin,
      // });
    } catch (error) {
      const { payload } = await addNotification({
        header: error.message,
        body: "Please try again.",
        type: "error",
      });

      setErrorKeys((prevState) => [...prevState, payload.key]);
    }
  };

  return (
    <div className="LoginContainer">
      <h1>Login</h1>
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="InputContainer">
          <label>Email</label>
          <input name="email" type="email" required />
        </div>
        <div className="InputContainer">
          <label>Password</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

LoginPage.propTypes = {
  addNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

export default connect(null, {
  addNotification: addNotificationBase,
  deleteNotification: deleteNotificationBase,
})(LoginPage);
