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

class ItemModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: '',
      collapse: false,
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
      vision: this.state.vision,
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  toggle = () => {
    this.setState((state) => ({ collapse: !state.collapse }));
  }




  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Button outline color="#F0F4F7" onClick={this.toggle} style={{ marginBottom: '1rem'}}>
            <div align="left">{this.state.collapse ? <FontAwesomeIcon icon={faChevronDown} /> :  <FontAwesomeIcon icon={faChevronRight} />}
              {' '}
              Your General Information
            </div>
          </Button>
          <Collapse isOpen={this.state.collapse}>
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
          <Button color="#F0F4F7" onClick={this.toggle} style={{ marginBottom: '1rem' }} block>
            <div align="left">{this.state.collapse ? <FontAwesomeIcon icon={faChevronDown} /> :  <FontAwesomeIcon icon={faChevronRight} />}
              {' '}
              Your General Information
            </div>
          </Button>
          <Collapse isOpen={this.state.collapse}>
            <FormGroup>
              <Label for="item">Organization Name</Label>
              <Input
                type="textarea"
                name="mission"
                id="item"
                placeholder="Organization Mission"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="item">Address</Label>
              <Input
                type="text"
                name="vision"
                id="item"
                placeholder="Organization Vision"
                onChange={this.onChange}
              />
            </FormGroup>
          </Collapse>
          <Button color="#F0F4F7" onClick={this.toggle} style={{ marginBottom: '1rem' }} block>
            <div align="left">{this.state.collapse ? <FontAwesomeIcon icon={faChevronDown} /> :  <FontAwesomeIcon icon={faChevronRight} />}
              {' '}
              Your General Information
            </div>
          </Button>
          <Collapse isOpen={this.state.collapse}>
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
          <Button color="#F0F4F7" onClick={this.toggle} style={{ marginBottom: '1rem' }} block>
            <div align="left">{this.state.collapse ? <FontAwesomeIcon icon={faChevronDown} /> :  <FontAwesomeIcon icon={faChevronRight} />}
              {' '}
              Your General Information
            </div>
          </Button>
          <Collapse isOpen={this.state.collapse}>
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

export default connect(mapStateToProps, { addItem })(ItemModal);
