import React, { Component } from 'react';
import {
  Button,
  Form,
} from 'reactstrap';
import GeneralInformation from './GeneralInformation';
import MissionVision from './MissionVision';
import Decision from './Decision';
import Feedback from './Feedback';
import { connect } from 'react-redux';
import { addItem } from '../redux/actions/itemActions';

class ApplicationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      collapse: [false, false, false, false],
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      contactName: this.state.contactName,
      reason: this.state.reason,
      website: this.state.website,
      mission: this.state.mission,
      decision: this.state.decision,
      feedback: this.state.feedback,
    };
    console.log(newItem)

    // Add item via addItem action
    this.props.addItem(newItem);
  };

  toggle = (n) => {
    let newArr = [...this.state.collapse];
    newArr[n] = !newArr[n]
    this.setState({ collapse: newArr });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <GeneralInformation onChange={this.onChange} />
          <MissionVision onChange={this.onChange} />
          <Decision onChange={this.onChange} />
          <Feedback onChange={this.onChange} />
          <div className="d-flex justify-content-between">
            <div />
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div className="btn-group mr-2" role="group" aria-label="First group">
                <Button outline color="secondary">Reset</Button>
              </div>
              <div className="btn-group mr-2" role="group" aria-label="Second group">
                <Button type="submit" className="btn btn-secondary">Submit</Button>
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
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ApplicationList);
