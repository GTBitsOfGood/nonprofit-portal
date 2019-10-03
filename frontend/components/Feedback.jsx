import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Collapse,
  Input, Form,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight} from '@fortawesome/free-solid-svg-icons'

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggle = () => {
    this.setState((state) => ({ open: !state.open }));
  }

  render() {
    return (
      <>
        <Button color="#F0F4F7" onClick={() => this.toggle()} style={{ marginBottom: '1rem' }} block>
          <div align="left">
            {this.state.open ? <FontAwesomeIcon icon={faChevronDown} />
              : <FontAwesomeIcon icon={faChevronRight} />}
            {' '}
            Your Questions
          </div>
        </Button>
        <Collapse isOpen={this.state.open}>
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
              onChange={this.props.onChange}
            />
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

export default Feedback;
