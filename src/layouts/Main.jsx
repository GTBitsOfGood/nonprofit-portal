import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppNavbar from '../components/AppNavbar/AppNavbar';
import Notification from '../components/Notification/Notification';

class MainLayout extends React.PureComponent {
  render() {
    const { user, children, notifications } = this.props;

    const { byId, byOrder } = notifications;

    return (
      <>
        <div className="App">
          <AppNavbar user={user} />
          {children}
        </div>
        <div className="notificationContainer">
          {byOrder.map((notification) => (
            <Notification
              key={byId[notification].key}
              notification={byId[notification]}
            />
          ))}
        </div>
      </>
    );
  }
}

MainLayout.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    isAdmin: PropTypes.bool,
  }),
  children: PropTypes.element.isRequired,
  notifications: PropTypes.shape({
    byOrder: PropTypes.arrayOf(PropTypes.string),
    byId: PropTypes.objectOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      body: PropTypes.string,
      type: PropTypes.oneOf(['default', 'success', 'error', 'warning', 'info']).isRequired,
      expiresIn: PropTypes.number.isRequired,
      persist: PropTypes.bool.isRequired,
    })),
  }).isRequired,
};

MainLayout.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, null)(MainLayout);
