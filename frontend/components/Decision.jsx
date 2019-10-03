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

class Decision extends Component {
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
            Your Decision To Join Us
          </div>
        </Button>
        <Collapse isOpen={this.state.open}>
          <FormGroup>
            <Label for="item">What kind of product needs do you hope BoG can support you with?</Label>
            <Input
              type="textarea"
              name="product"
              id="item"
              placeholder="checkbox goes here"
              onChange={this.props.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="item">Why have you decided to work with us?</Label>
            <Input
              type="textarea"
              name="decision"
              id="item"
              placeholder="Placeholder"
              onChange={this.props.onChange}
            />
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

export default Decision;
