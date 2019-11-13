import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormGroup,
  Label,
  Collapse,
  Input,
  CustomInput,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from 'formik';
import '../static/style/App.css';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

class GeneralInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };
  }

  toggleCollapse = () => {
    this.setState((state) => ({
      open: !state.open,
    }));
  };

  render() {
    const { onChange, values, onBlur } = this.props;
    const { open } = this.state;

    return (
      <>
        <Button
          outline
          color="#F0F4F7"
          onClick={this.toggleCollapse}
          style={{ marginBottom: '1rem' }}
          block
        >
          <div align="left">
            { open ? (
              <FontAwesomeIcon icon={faChevronDown} style={{ }} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            )}
            {' '}
            Your General Information
          </div>
        </Button>
        <Collapse isOpen={open}>
          <p>Please fill out the blanks so we can know more about your organization</p>
          <FormGroup>
            <Label for="application">Organization Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder=""
              onChange={onChange}
              value={values.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Street Address</Label>
            <Input
              type="text"
              name="streetaddress"
              id="streetaddress"
              placeholder=""
              onChange={onChange}
              value={values.streetaddress}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">City & State & Zip</Label>
            <div>
              <CustomInput
                type="text"
                name="city"
                id="city"
                placeholder=""
                onChange={onChange}
                label="city"
                className="reactstrap-input"
                value={values.city}
                inline
              />
              <CustomInput
                type="select"
                name="state"
                id="state"
                placeholder="(Optional)"
                onChange={onChange}
                style={{ width: '75px', marginLeft: '1%' }}
                value={values.state}
                inline
              >
                <option hidden disabled selected value>&nbsp;</option>
                <option>AL</option>
                <option>AK</option>
                <option>AZ</option>
                <option>AR</option>
                <option>CA</option>
                <option>CO</option>
                <option>CT</option>
                <option>DE</option>
                <option>FL</option>
                <option>GA</option>
                <option>HI</option>
                <option>ID</option>
                <option>IL</option>
                <option>IN</option>
                <option>IA</option>
                <option>KS</option>
                <option>KY</option>
                <option>LA</option>
                <option>ME</option>
                <option>MD</option>
                <option>MA</option>
                <option>MI</option>
                <option>MN</option>
                <option>MS</option>
                <option>MO</option>
                <option>MT</option>
                <option>NE</option>
                <option>NV</option>
                <option>NH</option>
                <option>NJ</option>
                <option>NM</option>
                <option>NY</option>
                <option>NC</option>
                <option>ND</option>
                <option>OH</option>
                <option>OK</option>
                <option>OR</option>
                <option>PA</option>
                <option>RI</option>
                <option>SC</option>
                <option>SD</option>
                <option>TN</option>
                <option>TX</option>
                <option>UT</option>
                <option>VT</option>
                <option>VA</option>
                <option>WA</option>
                <option>WV</option>
                <option>WI</option>
                <option>WY</option>
                <option>N/A</option>
              </CustomInput>
              <CustomInput
                type="text"
                name="zipcode"
                id="zipcode"
                placeholder=""
                onChange={onChange}
                style={{ marginLeft: '2%' }}
                value={values.state}
                className="reactstrap-input"
                inline
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="application">Website</Label>
            <Input
              type="url"
              name="website"
              id="website"
              placeholder="(Optional)"
              value={values.website}
              onChange={onChange}
              onBlur={onBlur}
            />
            <ErrorMessage name="website" render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
          </FormGroup>
          <FormGroup>
            <Label for="application">Work Phone</Label>
            <Input
              type="text"
              name="workPhone"
              id="workPhone"
              placeholder=""
              value={values.workPhone}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Person of Contact</Label>
            <Input
              type="text"
              name="contactName"
              id="contactName"
              placeholder=""
              value={values.contactName}
              onChange={onChange}
            />
            <ErrorMessage name="website" render={(msg) => <div>{msg}</div>} />
          </FormGroup>
          <FormGroup>
            <Label for="application">Mobile Phone</Label>
            <Input
              type="text"
              name="mobilePhone"
              id="mobilePhone"
              placeholder=""
              value={values.mobilePhone}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="application">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder=""
              value={values.email}
              onChange={onChange}
              onBlur={onBlur}
            />
            <ErrorMessage name="email" render={(msg) => <div style={{ color: 'red' }}>{msg}</div>} />
          </FormGroup>
        </Collapse>
      </>
    );
  }
}

GeneralInformation.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default GeneralInformation;
