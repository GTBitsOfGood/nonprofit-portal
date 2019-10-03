import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Collapse,
  Input,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons'

class GeneralInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleCollapse = () => {
    this.setState((state) => ({ open: !state.open }));
  }

  render() {
    return (
      <>
        <Button outline color="#F0F4F7" onClick={() => this.toggleCollapse()} style={{ marginBottom: '1rem'}}>
          <div align="left">
            { this.state.open ? <FontAwesomeIcon icon={faChevronDown} />
              : <FontAwesomeIcon icon={faChevronRight} />}
            {' '}
            Your General Information
          </div>
        </Button>
        <Collapse isOpen={this.state.open}>
          <FormGroup>
            <Label for="item">Organization Name</Label>
            <Input
              type="text"
              name="name"
              id="item"
              placeholder="Organization Name"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Address</Label>
            <Input
              type="text"
              name="address"
              id="item"
              placeholder="Organization Address"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Email</Label>
            <Input
              type="email"
              name="email"
              id="item"
              placeholder="Organization Email"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Contact Name</Label>
            <Input
              type="text"
              name="contactName"
              id="item"
              placeholder="Contact Name"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">How do you serve the community?</Label>
            <Input
              type="textarea"
              name="reason"
              id="item"
              placeholder="Tell us a bit about your organization"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Website</Label>
            <Input
              type="url"
              name="website"
              id="item"
              placeholder="Website Link"
              onChange={this.props.onChange}
            />
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

export default GeneralInformation;

