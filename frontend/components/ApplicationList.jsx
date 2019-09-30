import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Collapse,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons'
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
    console.log('work?')


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
          <Button outline color="#F0F4F7" onClick={() => this.toggle(0)} style={{ marginBottom: '1rem'}}>
            <div align="left">{ this.state.collapse[0] ? <FontAwesomeIcon icon={faChevronDown} /> :  <FontAwesomeIcon icon={faChevronRight} />}
              {' '}
              Your General Information
            </div>
          </Button>
          <Collapse isOpen={this.state.collapse[0]}>
            <FormGroup>
              <Label for="item">Organization Name</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Organization Name"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="item">Address</Label>
              <Input
                type="text"
                name="address"
                id="item"
                placeholder="Organization Address"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="item">Email</Label>
              <Input
                type="email"
                name="email"
                id="item"
                placeholder="Organization Email"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="item">Contact Name</Label>
              <Input
                type="text"
                name="contactName"
                id="item"
                placeholder="Contact Name"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="item">How do you serve the community?</Label>
              <Input
                type="textarea"
                name="reason"
                id="item"
                placeholder="Tell us a bit about your organization"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="item">Website</Label>
              <Input
                type="url"
                name="website"
                id="item"
                placeholder="Website Link"
                onChange={this.onChange}
              />
            </FormGroup>
            </Collapse>
          <Button color="#F0F4F7" onClick={() => this.toggle(1)} style={{ marginBottom: '1rem' }} block>
            <div align="left">{this.state.collapse[1] ? <FontAwesomeIcon icon={faChevronDown} /> :  <FontAwesomeIcon icon={faChevronRight} />}
              {' '}
              Your Mission & Vision
            </div>
          </Button>
          <Collapse isOpen={this.state.collapse[1]}>
            <FormGroup>
              <Label for="item">Please tell us the mission of your organization. What services do you provide to the community?</Label>
              <Input
                type="textarea"
                name="mission"
                id="item"
                placeholder="Organization Mission"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="item">Please tell us the vision of your organization. How can BoG help with it?</Label>
              <Input
                type="textarea"
                name="vision"
                id="item"
                placeholder="Organization Vision"
                onChange={this.onChange}
              />
            </FormGroup>
          </Collapse>
          <Button color="#F0F4F7" onClick={() => this.toggle(2)} style={{ marginBottom: '1rem' }} block>
            <div align="left">{this.state.collapse[2] ? <FontAwesomeIcon icon={faChevronDown} /> :  <FontAwesomeIcon icon={faChevronRight} />}
              {' '}
              Your Decision To Join Us
            </div>
          </Button>
          <Collapse isOpen={this.state.collapse[2]}>
            <FormGroup>
              <Label for="item">What kind of product needs do you hope BoG can support you with?</Label>
              <Input
                type="textarea"
                name="product"
                id="item"
                placeholder="checkbox goes here"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="item">Why have you decided to work with us?</Label>
              <Input
                type="textarea"
                name="decision"
                id="item"
                placeholder="Placeholder"
                onChange={this.onChange}
              />
            </FormGroup>
          </Collapse>
          <Button color="#F0F4F7" onClick={() => this.toggle(3)} style={{ marginBottom: '1rem' }} block>
            <div align="left">{this.state.collapse[3] ? <FontAwesomeIcon icon={faChevronDown} /> :  <FontAwesomeIcon icon={faChevronRight} />}
              {' '}
              Your Questions
            </div>
          </Button>
          <Collapse isOpen={this.state.collapse[3]}>
            <FormGroup>
              <Label for="item">
                Please let us know if you have any other questions or feedback.
                You can also reach out to us at
                <a href="mailto:hello@bitsofgood.org"> hello@bitsofgood.org</a>
                .
              </Label>
              <Input
                type="textarea"
                name="feedback"
                id="item"
                placeholder="Optional"
                onChange={this.onChange}
              />
            </FormGroup>
          </Collapse>
          <Button
            color="dark"
            style={{ marginTop: '2rem' }}
            block
          >
            Submit Application
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ApplicationList);
