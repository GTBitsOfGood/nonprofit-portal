import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Collapse,
  Input,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
        <Button outline color="#F0F4F7" onClick={() => this.toggleCollapse()} style={{ marginBottom: '1rem'}}>
          <div align="left">
            { this.state.open ? <FontAwesomeIcon icon={faChevronDown} />
              : <FontAwesomeIcon icon={faChevronRight} />}
            {' '}
            Your General Information
          </div>
        </Button>
        <Collapse style={{ borderStyle: 'solid', padding: '20px' }} isOpen={this.state.open}>
          <p>Please fill out the blanks so we can know more about your organization</p>
          <FormGroup>
            <Label for="item">Organization Name</Label>
            <Input
              type="text"
              name="name"
              id="item"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Address</Label>
            <Input
              type="text"
              name="address"
              id="item"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Website</Label>
            <Input
              type="url"
              name="website"
              id="item"
              placeholder="(Optional)"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Work Phone</Label>
            <Input
              type="text"
              name="workPhone"
              id="item"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Person of Contact</Label>
            <Input
              type="text"
              name="contactName"
              id="item"
              placeholder=""
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Mobile Phone</Label>
            <Input
              type="text"
              name="mobilePhone"
              id="item"
              placeholder="(Optional)"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Email</Label>
            <Input
              type="email"
              name="email"
              id="item"
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

