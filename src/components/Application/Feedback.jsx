import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, Collapse, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  toggleCollapse = () => {
    this.setState((state) => ({
      open: !state.open,
    }));
  };

  render() {
    const { onChange, values } = this.props;
    const { open } = this.state;

    return (
      <>
        <Button
          color="#F0F4F7"
          onClick={this.toggleCollapse}
          block
          className={`formCollapseController${open ? " open" : ""}`}
        >
          <div align="left">
            {open ? (
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            )}{" "}
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
}

Feedback.propTypes = {
  onChange: PropTypes.func.isRequired,
  /* eslint-disable */
  values: PropTypes.object.isRequired,
};

export default Feedback;
