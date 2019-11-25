import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavbar from '../components/AppNavbar';
import Notification from '../components/Notification/Notification';

class MainLayout extends React.PureComponent {
  render() {
    const { user, children, notifications } = this.props;

    return (
      <div className="App">
        <AppNavbar user={user} />
        {children}
        <div className="notificationContainer">
          {notifications.map((notification) => (
            <Notification
              key={notification.key}
              notification={notification}
            />
          ))}
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    isAdmin: PropTypes.bool,
  }).isRequired,
  children: PropTypes.element.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'error']).isRequired,
    expiresIn: PropTypes.number.isRequired,
    persist: PropTypes.bool.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  notifications: Object.keys(state).notifications.map((key) => ({
    key,
    ...state.notifications[key],
  })),
});

export default connect(mapStateToProps, null)(MainLayout);
