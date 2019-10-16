import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Collapse,
  Input,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

class GeneralInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  toggleCollapse = () => {
    this.setState((state) => ({ open: !state.open }));
  }

  render() {
    return (
      <>
        <Button outline color="#F0F4F7" onClick={() => this.toggleCollapse()} style={{ marginBottom: '1rem' }}>
          <div align="left">
            { this.state.open ? <FontAwesomeIcon icon={faChevronDown} style={{ }} />
              : <FontAwesomeIcon icon={faChevronRight} size="sm" />}
            {' '}
            Your General Information
          </div>
        </Button>
        <Collapse isOpen={this.state.open}>
          <p>Please fill out the blanks so we can know more about your organization</p>
          <FormGroup>
            <Label for="application">Organization Name</Label>
            <Input
              type="text"
              name="name"
              id="application"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Address</Label>
            <Input
              type="text"
              name="address"
              id="application"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Website</Label>
            <Input
              type="url"
              name="website"
              id="application"
              placeholder="(Optional)"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Work Phone</Label>
            <Input
              type="text"
              name="workPhone"
              id="application"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Person of Contact</Label>
            <Input
              type="text"
              name="contactName"
              id="application"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Mobile Phone</Label>
            <Input
              type="text"
              name="mobilePhone"
              id="application"
              placeholder="(Optional)"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Email</Label>
            <Input
              type="email"
              name="email"
              id="application"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

export default GeneralInformation;

