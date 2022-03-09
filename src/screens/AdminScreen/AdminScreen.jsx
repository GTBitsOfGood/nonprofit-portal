import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { connect } from "react-redux";
import { InputGroup, Input, InputGroupAddon, InputGroupText } from "reactstrap";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {
  getApplications as getApplicationsBase,
  deleteApplication as deleteApplicationBase,
} from "../../redux/actions/applicationActions";
import { addNotification as addNotificationBase } from "../../redux/actions/notificationActions";
import Application from "./Application";
import classes from "./AdminScreen.module.css";
import { useUser } from "../../actions/users";
import urls from "../../utils/urls";

function AdminScreen({
  getApplications,
  applications,
  deleteApplication,
  addNotification,
}) {
  const { user } = useUser({
    redirectTo: urls.pages.application,
  });
  const [selectedApp, setSelApp] = React.useState(null);
  const [curSearch, setCurSearch] = React.useState("");
  const [debSearch, setDebSearch] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        await getApplications();
      } catch (error) {
        await addNotification({
          header: "Failed retrieving applications!",
          body: "Please refresh and try again.",
          type: "error",
          persist: true,
        });
      }
    })();
  }, [getApplications, addNotification]);

  const debouncedSearchHandler = React.useCallback(
    debounce(setDebSearch, 300),
    []
  );

  const onDeleteClick = async (id) => {
    try {
      await deleteApplication(id);

      await addNotification({
        header: "Successfully deleted application!",
        type: "success",
      });

      setSelApp(null);
    } catch (error) {
      await addNotification({
        header: "Failed to delete application!",
        body: "Please refresh and try again.",
        type: "error",
        persist: true,
      });
    }
  };

  const setSearch = (event) => {
    const curValue = event.target.value;
    setSearch(curValue);
    debouncedSearchHandler(curValue.toLowerCase());
  };

  const clearSearch = () => {
    setCurSearch("");
    setDebSearch("");
  };

  const filteredApps = React.useMemo(
    () =>
      applications.filter((item) =>
        item.name.toLowerCase().includes(debSearch)
      ),
    [applications, debSearch]
  );

  return (
    <div className={classes.flexHorizontal}>
      <div className={classes.flexVertical}>
        <div className={classes.appListSearch}>
          <InputGroup>
            <Input placeholder="Name" value={curSearch} onChange={setSearch} />
            <InputGroupAddon
              addonType="append"
              onClick={clearSearch}
              style={{ cursor: "pointer" }}
            >
              <InputGroupText>Clear</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className={classes.appNameList}>
          {filteredApps.map((info) => (
            <div
              key={info._id}
              className={clsx(
                classes.appNameContainer,
                info._id === selectedApp && classes.nameSelected
              )}
              onClick={() => setSelApp(info._id)}
            >
              <div className={classes.nameTextContainer}>
                <h3>{info.name}</h3>
                <p>{`Submitted: ${moment(info.submitted).format(
                  "MMMM Do, YYYY"
                )}`}</p>
              </div>
              {info.status === 0 && (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  color="#afafaf"
                  size="lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={classes.appView}>
        {selectedApp != null && (
          <Application
            info={applications.find((app) => app._id === selectedApp)}
            deleteHandler={onDeleteClick}
          />
        )}
      </div>
    </div>
  );
}

AdminScreen.propTypes = {
  getApplications: PropTypes.func.isRequired,
  deleteApplication: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  applications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  applications: state.application.applications,
});

export default connect(mapStateToProps, {
  getApplications: getApplicationsBase,
  deleteApplication: deleteApplicationBase,
  addNotification: addNotificationBase,
})(AdminScreen);
