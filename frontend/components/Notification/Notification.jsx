import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteNotification as deleteNotificationBase,
} from '../../redux/actions/notificationActions';
import './Notification.css';

class Notification extends React.PureComponent {
  componentDidMount() {
    const { notification, deleteNotification } = this.props;
    const { key, expiresIn, persist } = notification;

    if (!persist) {
      setTimeout(async () => {
        await deleteNotification(key);
      }, expiresIn);
    }
  }

  render() {
    const { notification } = this.props;
    const { message, type } = notification;

    return (
      <div className={`Notification ${type}`}>
        <p>{message}</p>
      </div>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({
    key: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'error']).isRequired,
    expiresIn: PropTypes.number.isRequired,
    persist: PropTypes.bool.isRequired,
  }).isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteNotification: deleteNotificationBase,
})(Notification);
