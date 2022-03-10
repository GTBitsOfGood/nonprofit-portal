import React from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Collapse, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function MissionVision({ onChange, values }) {
  const [open, setOpen] = React.useState(false);

  const toggleCollapse = () => setOpen((prevState) => !prevState);

  return (
    <>
      <Button
        color="#F0F4F7"
        onClick={toggleCollapse}
        block
        className={`formCollapseController${open ? " open" : ""}`}
      >
        <div align="left">
          {open ? (
            <FontAwesomeIcon icon={faChevronDown} size="sm" />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          )}{" "}
          Your Mission
        </div>
      </Button>
      <Collapse isOpen={open} className="formCollapse">
        <div>
          <FormGroup>
            <p>
              At Bits of Good, our mission is to change lives one bit at a time
              - we serve our community by building powerful applications for
              local nonprofits.
            </p>
            <Label for="application">
              We want to know the mission of your organization. Who do you care
              to serve? What services do you provide to the community? How could
              the collaboration with BoG help you achieve your mission?
            </Label>
            <Input
              type="textarea"
              name="mission"
              id="mission"
              placeholder="Organization Mission"
              value={values.mission}
              onChange={onChange}
              required
            />
          </FormGroup>
        </div>
      </Collapse>
    </>
  );
}

MissionVision.propTypes = {
  onChange: PropTypes.func.isRequired,
  /* eslint-disable */
  values: PropTypes.object.isRequired,
};

export default MissionVision;
