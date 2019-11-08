import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LandingBodyMessage from '../LandingBodyMessage';
import NonProfitCalendar from '../calendar/NonProfitCalendar';
import { updateAvailability as updateAvailabilityBase } from '../../redux/actions/availabilityActions';

import './ScheduleInterviewBody.css';

class ScheduleInterviewBody extends React.PureComponent {
  constructor(props) {
    super(props);

    const { name } = this.props;

    this.state = {
      name,
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

  selectHour = (selectedHour) => {
    this.setState({
      selectedHour,
    });
  };

  submitForm = (e) => {
    e.preventDefault();

    const {
      name,
      selectedHour,
      person,
      phone,
    } = this.state;

    const { updateAvailability } = this.props;

    if (selectedHour === null) {
      alert('Please select a time for your interview!');
    }

    if (selectedHour != null && person != null && phone != null) {
      updateAvailability(selectedHour, true, name, person, phone);
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
          selectHour={selectedHour}
          selectHourHandler={this.selectHour}
        />
        <form
          className="formSection"
          onSubmit={this.submitForm}
        >
          <div className="formInputs">
            <div className="singleInput">
              <p style={{ fontWeight: 600 }}>Person Of Contact</p>
              <input
                type="text"
                name="person"
                onChange={this.onChange}
                style={{
                  borderRadius: '5px',
                  border: '1px solid black',
                  padding: '0px 15px',
                }}
                required
              />
            </div>
            <div className="singleInput">
              <p style={{ fontWeight: 600 }}>Mobile Phone</p>
              <input
                type="tel"
                name="phone"
                onChange={this.onChange}
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                style={{
                  borderRadius: '5px',
                  border: '1px solid black',
                  padding: '0px 15px',
                }}
                required
              />
            </div>
          </div>
          <p style={{ paddingTop: '35px', fontWeight: 600 }}>
            Can't find a time that works? Feel free to email us at
            {' '}
            <a href="mailto:hello@bitsofgood.org" style={{ color: 'black', textDecoration: 'underline' }}>hello@bitsofgood.org</a>
          </p>
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
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  availability: state.availability,
});

export default connect(mapStateToProps, {
  updateAvailability: updateAvailabilityBase,
})(ScheduleInterviewBody);
