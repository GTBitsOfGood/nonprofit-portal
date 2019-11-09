import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LandingBodyMessage from '../LandingBodyMessage';
import NonProfitCalendar from '../calendar/NonProfitCalendar';
import { updateAvailability as updateAvailabilityBase } from '../../redux/actions/availabilityActions';
import { updateApplicationState as updateApplicationStateBase } from '../../redux/actions/applicationActions';
import './ScheduleInterviewBody.css';

class ScheduleInterviewBody extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedHour: null,
      person: null,
      phone: null,
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  selectHour = (id) => {
    this.setState({
      selectedHour: id,
    });
  };

  submitForm = async (e) => {
    e.preventDefault();

    const { updateAvailability, updateApplicationState } = this.props;
    const { selectedHour, person, phone } = this.state;

    if (selectedHour != null && person != null && phone != null) {
      await updateAvailability(selectedHour, true, 'team');
      await updateApplicationState(id, 2);
    }
  };

  render() {
    const { selectedHour } = this.state;

    return (
      <div>
        <LandingBodyMessage width={700}>
          Congratulations! After reviewing your application, we decide to move forward with you!
          For the next step, we hope to have a one-hour meeting through a virtual call to learn
          more about you. When you have a moment, please let us know when you’d be available
          for the call, as well as the number to best reach you. Shortly after you submit your
          availability, our team will review your request and our availability, and will confirm
          the time and date for the call.
        </LandingBodyMessage>
        <NonProfitCalendar
          selectedHour={selectedHour}
          selectHourHandler={this.selectHour}
        />
        <form
          className="formSection"
          onSubmit={this.submitForm}
        >
          <div className="formInputs">
            <div className="singleInput">
              <p>Person Of Contact</p>
              <input
                type="text"
                name="person"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="singleInput">
              <p>Mobile Phone</p>
              <input
                type="tel"
                name="phone"
                onChange={this.onChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </div>
          </div>
          <button
            className="submitButton"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

ScheduleInterviewBody.propTypes = {
  updateAvailability: PropTypes.func.isRequired,
  updateApplicationState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  availability: state.availability,
});

export default connect(mapStateToProps, {
  updateAvailability: updateAvailabilityBase,
  updateApplicationState: updateApplicationStateBase,
})(ScheduleInterviewBody);
