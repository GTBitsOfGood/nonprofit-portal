import React, { Component } from 'react';
import {
  Button,
  Form,
} from 'reactstrap';
import { connect } from 'react-redux';
import GeneralInformation from './GeneralInformation';
import MissionVision from './MissionVision';
import ProductNeeds from './ProductNeeds';
import Feedback from './Feedback';
import { addApplication } from '../redux/actions/applicationActions';

class ApplicationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      application: '',
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value || event.target.checked,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { app } = this.state;

    const newApplication = {
      name: app.name,
      address: app.address,
      website: app.website,
      workPhone: app.workPhone,
      contactName: app.contactName,
      mobilePhone: app.mobilePhone,
      email: app.email,
      mission: app.mission,
      needsWeb: app.needsWeb,
      needsMobile: app.needsMobile,
      needsOther: app.needsOther,
      needsOtherExpand: app.needsOtherExpand,
      stageRadio: app.stageRadio,
      stageOtherExpand: app.stageOtherExpand,
      availRadio: app.availRadio,
      fieldRadio: app.fieldRadio,
      productExtra: app.productExtra,
      feedback: app.feedback,
    };
    // Add application via addApplication action
    app.addApplication(newApplication);
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

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, { addApplication })(ApplicationForm);
