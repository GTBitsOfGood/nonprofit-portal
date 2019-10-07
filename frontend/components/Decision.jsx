import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Collapse,
  CustomInput,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
            Your Product Needs
          </div>
        </Button>
        <Collapse isOpen={this.state.open}>
          <Form>
            <FormGroup>
              <Label for="item">What kind of product needs do you hope BoG can support you with?</Label>
              <div>
                <CustomInput type="checkbox" id="exampleCustomInline" label="Web Application" inline />
                <CustomInput type="checkbox" id="exampleCustomInline2" label="Mobile Application" inline />
                <CustomInput type="checkbox" id="exampleCustomInline3" label="Other" inline />
                <CustomInput type="textarea" id="exampleText" inline />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="item">What is the stage of the product development?</Label>
              <div>
                <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="It's brand new. We haven't built anything yet" default
                checked />
                <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="We had some progress, but it's not finished" />
                <CustomInput type="radio" id="exampleCustomRadio3" name="customRadio" label="We have a developed product, but we want to redesign it" />
                <CustomInput type="radio" id="exampleCustomRadio4" name="customRadio" label="Other" inline />
                <CustomInput type="textarea" id="exampleText" inline />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="item">What is your availability to work with us in the upcoming semester?</Label>
              <div>
                <CustomInput type="radio" id="exampleCustomRadio5" name="customRadio2" label="We have a flexible schedule and can beet with the BoG team upon request" default
                checked />
                <CustomInput type="radio" id="exampleCustomRadio6" name="customRadio2" label="Once a week" />
                <CustomInput type="radio" id="exampleCustomRadio7" name="customRadio2" label="Once every two weeks" />
                <CustomInput type="radio" id="exampleCustomRadio8" name="customRadio2" label="Once every month" />
                <CustomInput type="radio" id="exampleCustomRadio9" name="customRadio2" label="Less than once a month" />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="item">Can you provide a field for us to know more about your organization and users? (i.e. observe or interview the users)</Label>
              <div>
                <CustomInput type="radio" id="exampleCustomRadio10" name="customRadio3" label="Yes" default
                checked />
                <CustomInput type="radio" id="exampleCustomRadio11" name="customRadio3" label="No" />
                <CustomInput type="radio" id="exampleCustomRadio12" name="customRadio3" label="We would work remotely but could connect the BoG team with users" />
              </div>
            </FormGroup>
          </Form>
        </Collapse>
      </>
    );
  }
}

export default Decision;
