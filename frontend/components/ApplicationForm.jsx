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

    const newApplication = {
      name: this.state.name,
      address: this.state.address,
      website: this.state.website,
      workPhone: this.state.workPhone,
      contactName: this.state.contactName,
      mobilePhone: this.state.mobilePhone,
      email: this.state.email,
      mission: this.state.mission,
      needsWeb: this.state.needsWeb,
      needsMobile: this.state.needsMobile,
      needsOther: this.state.needsOther,
      needsOtherExpand: this.state.needsOtherExpand,
      stageRadio: this.state.stageRadio,
      stageOtherExpand: this.state.stageOtherExpand,
      availRadio: this.state.availRadio,
      fieldRadio: this.state.fieldRadio,
      productExtra: this.state.productExtra,
      feedback: this.state.feedback,
    };
    // Add application via addApplication action
    this.props.addApplication(newApplication);
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
