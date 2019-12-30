import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faCheck, faExclamation, faInfo,
} from '@fortawesome/free-solid-svg-icons';
import {
  deleteNotification as deleteNotificationBase,
} from '../../redux/actions/notificationActions';
import './Notification.css';

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disappearing: false,
    };
  }

  componentDidMount() {
    const { notification } = this.props;
    const { expiresIn, persist } = notification;

    if (!persist) {
      this.timer = setTimeout(async () => {
        this.onDelete();
      }, expiresIn);
    }
  }

  onDelete = () => {
    const { notification, deleteNotification } = this.props;
    const { key } = notification;

    if (this.timer != null) {
      clearTimeout(this.timer);
    }

    this.setState({
      disappearing: true,
    });

    setTimeout(async () => {
      await deleteNotification(key);
    }, 1100);
  };

  getIcon = () => {
    const { notification } = this.props;
    const { type } = notification;

    const size = '2x';

    switch (type) {
      case 'success':
        return <FontAwesomeIcon icon={faCheck} size={size} />;
      case 'error':
        return <FontAwesomeIcon icon={faTimes} size={size} />;
      case 'warning':
        return <FontAwesomeIcon icon={faExclamation} size={size} />;
      case 'info':
        return <FontAwesomeIcon icon={faInfo} size={size} />;
      default:
        return null;
    }
  };

  render() {
    const { notification } = this.props;
    const { disappearing } = this.state;

    const { type, header, body } = notification;

    return (
      <div className={`Notification${disappearing ? ' exit' : ' enter'}`}>
        <div className={`NotificationIcon ${type || ''}`}>
          {this.getIcon()}
        </div>
        <div className="NotificationText">
          <h3>{header}</h3>
          <p>{body}</p>
        </div>
        <div
          className="NotificationClose"
          onClick={this.onDelete}
        >
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </div>
      </div>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.shape({
    key: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    body: PropTypes.string,
    type: PropTypes.oneOf(['default', 'success', 'error', 'warning', 'info']),
    expiresIn: PropTypes.number.isRequired,
    persist: PropTypes.bool.isRequired,
  }).isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteNotification: deleteNotificationBase,
})(Notification);
