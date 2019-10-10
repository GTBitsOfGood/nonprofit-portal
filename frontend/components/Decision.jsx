import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Label,
  Collapse,
  Input,
  CustomInput,
} from 'reactstrap';
import '@fortawesome/fontawesome-svg-core/styles.css';
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
  };

  render() {
    return (
      <>
        <Button color="#F0F4F7" onClick={() => this.toggleCollapse()} block>
          <div align="left">
            {this.state.open ? <FontAwesomeIcon icon={faChevronDown} size="sm" />
              : <FontAwesomeIcon icon={faChevronRight} size="sm" />}
            {' '}
            Your Product Needs
          </div>
        </Button>
        <Collapse isOpen={this.state.open}>
          <FormGroup>
            <Label for="item">What kind of product needs do you hope BoG can support you with?</Label>
            <div>
              <CustomInput
                type="checkbox"
                id="needsWeb"
                name="needsWeb"
                value="Yes"
                label="Web Application"
                onChange={this.props.onChange}
                inline
              />
              <CustomInput
                type="checkbox"
                id="needsMobile"
                name="needsMobile"
                value="Yes"
                label="Mobile Application"
                onChange={this.props.onChange}
                inline
              />
              <CustomInput
                type="checkbox"
                id="needsOther"
                name="needsOther"
                value="Yes"
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
                value="Brand New"
                label="It's brand new. We haven't built anything yet"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="stageUnfinish"
                name="stageRadio"
                value="Not Finished"
                label="We had some progress, but it's not finished"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="stageRedesign"
                name="stageRadio"
                value="Needs Redesign"
                label="We have a developed product, but we want to redesign it"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="stageOther"
                name="stageRadio"
                value="Other"
                label="Other"
                onChange={this.props.onChange}
                inline
              />
              <CustomInput
                type="textarea"
                name="stageOtherExpand"
                id="stageOtherExpand"
                onChange={this.props.onChange}
                inline
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="item">What is your availability to work with us in the upcoming semester? The time you devote to us may directly influence the success of the project.</Label>
            <div>
              <CustomInput
                type="radio"
                id="availFlexible"
                name="availRadio"
                value="Flexible"
                label="We have a flexible schedule and can meet with the BoG team upon request"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="availWeek"
                name="availRadio"
                value="Weekly"
                label="Once a week"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="availBiweek"
                name="availRadio"
                value="Every two weeks"
                label="Once every two weeks"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="availMonth"
                name="availRadio"
                value="Once every Month"
                label="Once every month"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="availLess"
                name="availRadio"
                value="Less than once a month"
                label="Less than once a month"
                onChange={this.props.onChange}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="item">Can you provide a field tour for us to know more about your organization and users? (i.e. observe or interview the users)</Label>
            <div>
              <CustomInput
                type="radio"
                id="fieldYes"
                name="fieldRadio"
                value="Yes"
                label="Yes"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="fieldNo"
                name="fieldRadio"
                value="No"
                label="No"
                onChange={this.props.onChange}
              />
              <CustomInput
                type="radio"
                id="fieldRemote"
                name="fieldRadio"
                value="Remote but can connect with users"
                label="We would work remotely but could connect the BoG team with users"
                onChange={this.props.onChange}
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="productExtra">Is there anything else related to your product needs you want to share with us?</Label>
            <div>
              <Input
                type="textarea"
                name="productExtra"
                id="productExtra"
                placeholder="(Optional)"
                onChange={this.props.onChange}
              />
            </div>
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

export default Decision;
