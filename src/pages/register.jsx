import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signUp, useUser } from "../actions/users";
import {
  addNotification as addNotificationBase,
  deleteNotification as deleteNotificationBase,
} from "../redux/actions/notificationActions";
import "../static/style/Login.css";
import urls from "../utils/urls";

function RegisterPage({ addNotification, deleteNotification }) {
  const { mutateUser } = useUser({
    redirectTo: urls.pages.admin,
    redirectIfFound: true,
  });
  const [errorKeys, setErrorKeys] = React.useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.currentTarget.name.value;
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    try {
      deleteNotification(...errorKeys);
      mutateUser(await signUp(name, email, password));

      await addNotification({
        header: "Successfully created account!",
        type: "success",
      });

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
      <h1>Create User</h1>
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="InputContainer">
          <label>Name</label>
          <input name="name" type="text" required />
        </div>
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

RegisterPage.propTypes = {
  addNotification: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

export default connect(null, {
  addNotification: addNotificationBase,
  deleteNotification: deleteNotificationBase,
})(RegisterPage);
