import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Collapse,
  Input,
  CustomInput,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
        <Button color="#F0F4F7" onClick={() => this.toggleCollapse()} block>
          <div align="left">
            {this.state.open ? <FontAwesomeIcon icon={faChevronDown} />
              : <FontAwesomeIcon icon={faChevronRight} />}
            {' '}
            Your Product Needs
          </div>
        </Button>
        <Collapse style={{ borderStyle: 'solid', padding: '20px' }} isOpen={this.state.open}>
          <FormGroup>
            <Label for="item">What kind of product needs do you hope BoG can support you with?</Label>
            <div>
              <CustomInput
                type="checkbox"
                id="needsWeb"
                name="needsWeb"
                label="Web Application"
                onChange={this.props.onChange}
                inline
              />
              <CustomInput
                type="checkbox"
                id="needsMobile"
                name="needsMobile"
                label="Mobile Application"
                onChange={this.props.onChange}
                inline
              />
              <CustomInput
                type="checkbox"
                id="needsOther"
                name="needsOther"
                label="Other"
                onChange={this.props.onChange}
                inline
              />
              <CustomInput
                type="textarea"
                id="needsOtherExpand"
                name="needsOtherExpand"
                onChange={this.props.onChange}
                inline
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="item">What is the stage of the product development?</Label>
            <div>
              <CustomInput
                type="radio"
                id="stageNew"
                name="stageRadio"
                label="It's brand new. We haven't built anything yet"
                defaultChecked
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="stageUnfinish"
                name="stageRadio"
                label="We had some progress, but it's not finished"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="stageRedesign"
                name="stageRadio"
                label="We have a developed product, but we want to redesign it"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="stageOther"
                name="stageRadio"
                label="Other"
                onChange={this.props.onChange}
                inline
              />
              <CustomInput
                type="textarea"
                id="stageOtherExpand"
                onChange={this.props.onChange}
                inline
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="item">What is your availability to work with us in the upcoming semester? The time you devote to us may directly influence the success of the project.</Label>
            <div>
              <CustomInput type="radio" id="availFlexible" name="availRadio" label="We have a flexible schedule and can beet with the BoG team upon request" defaultChecked onChange={this.props.onChange} />
              <CustomInput type="radio" id="availWeek" name="availRadio" label="Once a week" onChange={this.props.onChange} />
              <CustomInput type="radio" id="availBiweek" name="availRadio" label="Once every two weeks" onChange={this.props.onChange} />
              <CustomInput type="radio" id="availMonth" name="availRadio" label="Once every month" onChange={this.props.onChange} />
              <CustomInput type="radio" id="availLess" name="availRadio" label="Less than once a month" onChange={this.props.onChange} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="item">Can you provide a field tour for us to know more about your organization and users? (i.e. observe or interview the users)</Label>
            <div>
              <CustomInput type="radio" id="fieldYes" name="fieldRadio" label="Yes" defaultChecked onChange={this.props.onChange} />
              <CustomInput type="radio" id="fieldNo" name="fieldRadio" label="No" onChange={this.props.onChange} />
              <CustomInput type="radio" id="fieldRemote" name="fieldRadio" label="We would work remotely but could connect the BoG team with users" onChange={this.props.onChange} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="item">Is there anything else related to your product needs you want to share with us?</Label>
            <Input
              type="textarea"
              name="productExtra"
              id="productExtra"
              placeholder="(Optional)"
              onChange={this.props.onChange}
            />
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

export default Decision;
