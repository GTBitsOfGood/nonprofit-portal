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

class MissionVision extends Component {
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
        <Button color="#F0F4F7" onClick={() => this.toggleCollapse()} style={{ marginBottom: '1rem' }} block>
          <div align="left">
            {this.state.open ? <FontAwesomeIcon icon={faChevronDown} size="sm" />
              : <FontAwesomeIcon icon={faChevronRight} size="sm" />}
            {' '}
            Your Mission
          </div>
        </Button>
        <Collapse isOpen={this.state.open}>
          <FormGroup>
            <p>At Bits of Good, our mission is to change lives one bit at a time - we serve our community by building powerful applications for local nonprofits.</p>
            <Label for="item">We want to know the mission of your organization. Who do you care to serve? What services do you provide to the community? How could the collaboration with BoG help you achieve your mission?</Label>
            <Input
              type="textarea"
              name="mission"
              id="item"
              placeholder="Organization Mission"
              onChange={this.props.onChange}
            />
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

export default MissionVision;
