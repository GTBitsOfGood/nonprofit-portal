import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import GeneralInformation from './GeneralInformation';
import MissionVision from './MissionVision';
import ProductNeeds from './ProductNeeds';
import Feedback from './Feedback';
import { addApplication as addApplicationBase } from '../redux/actions/applicationActions';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      application: {},
    };
  }

  onChange = (event) => {
    const eventName = event.target.name;
    const eventVal = event.target.value || event.target.checked;

    this.setState((prevState) => ({
      application: {
        ...prevState.application,
        [eventName]: eventVal,
      },
    }));
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { addApplication } = this.props;
    const { application } = this.state;

    // Add application via addApplication action
    addApplication(application)
      .then(({ payload }) => {
        window.location.href = `/p/${payload.urlString}`;
      });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <GeneralInformation onChange={this.onChange} />
          <MissionVision onChange={this.onChange} />
          <ProductNeeds onChange={this.onChange} />
          <Feedback onChange={this.onChange} />
          <div className="d-flex justify-content-between">
            <div />
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group mr-2" role="group" aria-label="First group">
                <Button outline color="dark">Reset</Button>
              </div>
              <div className="btn-group mr-2" role="group" aria-label="Second group">
                <Button type="submit" color="dark" className="btn btn-secondary">Submit</Button>
              </div>
            </div>
            <div />
          </div>
        </Form>
      </div>
    );
  }
}

ApplicationForm.propTypes = {
  addApplication: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, {
  addApplication: addApplicationBase,
})(ApplicationForm);
