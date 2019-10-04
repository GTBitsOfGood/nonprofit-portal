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
            {this.state.open ? <FontAwesomeIcon icon={faChevronDown} />
              : <FontAwesomeIcon icon={faChevronRight} />}
            {' '}
            Your Mission & Vision
          </div>
        </Button>
        <Collapse isOpen={this.state.open}>
          <FormGroup>
            <Label for="item">Please tell us the mission of your organization. What services do you provide to the community?</Label>
            <Input
              type="textarea"
              name="mission"
              id="item"
              placeholder="Organization Mission"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Please tell us the vision of your organization. How can BoG help with it?</Label>
            <Input
              type="textarea"
              name="vision"
              id="item"
              placeholder="Organization Vision"
              onChange={this.props.onChange}
            />
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

export default MissionVision;
