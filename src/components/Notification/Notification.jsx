import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faExclamation,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { deleteNotification as deleteNotificationBase } from "../../redux/actions/notificationActions";
import classes from "./Notification.module.css";

const iconMap = {
  success: faCheck,
  error: faTimes,
  warning: faExclamation,
  info: faInfo,
};

function Notification({ notification, deleteNotification }) {
  const { key, type, header, body, expiresIn, persist } = notification;
  const [disappearing, setDisappearing] = React.useState(false);
  const timer = React.useRef(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleDelete = React.useCallback(() => {
    if (timer.current != null) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    setDisappearing(true);

    setTimeout(async () => {
      await deleteNotification(key);
    }, 1100);
  }, [key, deleteNotification]);

  React.useEffect(() => {
    if (!persist) {
      timer.current = setTimeout(handleDelete, expiresIn);
    }
  }, [expiresIn, persist, handleDelete]);

  return (
    <div
      className={clsx(
        classes.Notification,
        disappearing ? classes.exit : classes.enter
      )}
    >
      <div className={clsx(classes.NotificationIcon, type)}>
        <FontAwesomeIcon icon={iconMap[type]} size="2x" />
      </div>
      <div className={classes.NotificationText}>
        <h3>{header}</h3>
        <p>{body}</p>
      </div>
      <div className={classes.NotificationClose} onClick={handleDelete}>
        <FontAwesomeIcon icon={faTimes} size="sm" />
      </div>
    </div>
  );
}

Notification.propTypes = {
  notification: PropTypes.shape({
    key: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    body: PropTypes.string,
    type: PropTypes.oneOf(["default", "success", "error", "warning", "info"]),
    expiresIn: PropTypes.number.isRequired,
    persist: PropTypes.bool.isRequired,
  }).isRequired,
  deleteNotification: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteNotification: deleteNotificationBase,
})(Notification);
