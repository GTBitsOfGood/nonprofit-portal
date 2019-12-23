import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  InputGroup, Input, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import { debounce } from 'lodash';
import {
  getApplications as getApplicationsBase,
  deleteApplication as deleteApplicationBase,
} from '../../redux/actions/applicationActions';
import { addNotification as addNotificationBase } from '../../redux/actions/notificationActions';
import Application from './Application';
import './ApplicationsList.css';

class ApplicationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedApp: 0,
      curSearch: '',
      debouncedSearch: '',
    };

    this.setStateDebounced = debounce((newState) => {
      this.setState(newState);
    }, 500);
  }

  componentDidMount() {
    const { getApplications, addNotification } = this.props;

    getApplications()
      .catch(async () => {
        await addNotification({
          header: 'Failed retrieving applications!',
          body: 'Please refresh and try again.',
          type: 'error',
          persist: true,
        });
      });
  }

  selectApplication = (index) => {
    this.setState({
      selectedApp: index,
    });
  };

  onDeleteClick = async (id) => {
    const { deleteApplication, addNotification } = this.props;

    await deleteApplication(id)
      .then(async () => {
        await addNotification({
          header: 'Successfully deleted application!',
          type: 'success',
        });

        this.setState({
          selectedApp: null,
        });
      })
      .catch(async () => {
        await addNotification({
          header: 'Failed to delete application!',
          body: 'Please refresh and try again.',
          type: 'error',
          persist: true,
        });
      });
  };

  setSearch = (event) => {
    const curValue = event.target.value;

    this.setState({
      curSearch: curValue,
    });

    this.setStateDebounced({
      debouncedSearch: curValue.toLowerCase(),
    });
  };

  clearSearch = () => {
    this.setState({
      curSearch: '',
      debouncedSearch: '',
    });
  };

  render() {
    const { applications } = this.props;
    const { selectedApp, curSearch, debouncedSearch } = this.state;

    const filteredApps = applications
      .filter((item) => item.name.toLowerCase().includes(debouncedSearch));

    return (
      <div className="flexHorizontal">
        <div className="flexVertical">
          <div className="appListSearch">
            <InputGroup>
              <Input
                placeholder="Name"
                value={curSearch}
                onChange={this.setSearch}
              />
              <InputGroupAddon
                addonType="append"
                onClick={this.clearSearch}
                style={{ cursor: 'pointer' }}
              >
                <InputGroupText>Clear</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="appNameList">
            {filteredApps.map((info, index) => (
              <div
                key={info._id}
                className={`appNameContainer${index === selectedApp ? ' nameSelected' : ''}`}
                onClick={() => this.selectApplication(index)}
              >
                <h3>{info.name}</h3>
                <p>{`Submitted: ${moment(info.submitted).format('MMMM Do, YYYY')}`}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="appView">
          {(selectedApp != null && applications != null && selectedApp < applications.length) && (
            <Application
              info={applications[selectedApp]}
              deleteHandler={this.onDeleteClick}
            />
          )}
        </div>
      </div>
    );
  }
}

ApplicationsList.propTypes = {
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
})(ApplicationsList);
