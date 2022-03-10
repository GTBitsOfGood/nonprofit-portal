import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, FormGroup, Label, Collapse, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Feedback({ onChange, values }) {
  const [open, setOpen] = React.useState(false);

  const toggleCollapse = () => setOpen((prevState) => !prevState);

  return (
    <>
      <Button
        color="#F0F4F7"
        onClick={toggleCollapse}
        block
        className={clsx("formCollapseController", open && "open")}
      >
        <div align="left">
          <FontAwesomeIcon
            icon={open ? faChevronDown : faChevronRight}
            size="sm"
          />{" "}
          Your Questions
        </div>
      </Button>
      <Collapse isOpen={open} className="formCollapse">
        <div>
          <FormGroup>
            <Label for="application">
              Please let us know if you have any other questions or feedback.
              You can also reach out to us at
              <a href="mailto:hello@bitsofgood.org"> hello@bitsofgood.org</a>.
            </Label>
            <Input
              type="textarea"
              name="feedback"
              id="feedback"
              placeholder="(Optional)"
              onChange={onChange}
              value={values.feedback}
            />
          </FormGroup>
        </div>
      </Collapse>
    </>
  );
}

Feedback.propTypes = {
  onChange: PropTypes.func.isRequired,
  /* eslint-disable */
  values: PropTypes.object.isRequired,
};

export default Feedback;
