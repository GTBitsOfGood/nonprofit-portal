import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Collapse,
  Input,
  CustomInput,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage } from "formik";
import "../../static/style/App.css";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const stateAbbreviations = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "N/A",
];

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
          block
          className={`formCollapseController${open ? " open" : ""}`}
        >
          <div align="left">
            {open ? (
              <FontAwesomeIcon icon={faChevronDown} style={{}} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            )}{" "}
            Your General Information
          </div>
        </Button>
        <Collapse isOpen={open} className="formCollapse">
          <div>
            <p>
              Please fill out the blanks so we can know more about your
              organization
            </p>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="application">Organization Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder=""
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values.name}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={10}>
                <FormGroup>
                  <Label for="application">Street Address</Label>
                  <Input
                    type="text"
                    name="streetaddress"
                    id="streetaddress"
                    placeholder=""
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values.streetaddress}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={2}>
                <FormGroup>
                  <Label for="application">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder=""
                    onChange={onChange}
                    onBlur={onBlur}
                    label="city"
                    value={values.city}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={1}>
                <FormGroup>
                  <Label for="application">State</Label>
                  <CustomInput
                    type="select"
                    name="state"
                    id="state"
                    placeholder=""
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values.state}
                    required
                  >
                    <option hidden disabled value="">
                      &nbsp;
                    </option>
                    {stateAbbreviations.map((abbrev) => (
                      <option key={abbrev}>{abbrev}</option>
                    ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col md={2}>
                <Label for="application">Zip Code</Label>
                <FormGroup>
                  <Input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    placeholder=""
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values.zipcode}
                    inline="true"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
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
                  <ErrorMessage
                    name="website"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="application">Work Phone</Label>
                  <Input
                    type="text"
                    name="workPhone"
                    id="workPhone"
                    placeholder=""
                    value={values.workPhone}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="application">Person of Contact</Label>
                  <Input
                    type="text"
                    name="contactName"
                    id="contactName"
                    placeholder=""
                    value={values.contactName}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                  />
                  <ErrorMessage
                    name="website"
                    render={(msg) => <div>{msg}</div>}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="application">Mobile Phone</Label>
                  <Input
                    type="text"
                    name="mobilePhone"
                    id="mobilePhone"
                    placeholder=""
                    value={values.mobilePhone}
                    onChange={onChange}
                    onBlur={onBlur}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={4}>
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
                    required
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Collapse>
      </>
    );
  }
}

GeneralInformation.propTypes = {
  onChange: PropTypes.func.isRequired,
  /* eslint-disable */
  values: PropTypes.object.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default GeneralInformation;
