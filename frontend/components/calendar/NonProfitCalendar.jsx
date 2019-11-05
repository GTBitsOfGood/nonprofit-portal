import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAvailabilities as getAvailabilitiesBase } from '../../redux/actions/availabilityActions';
import './NonProfitCalendar.css';

const getHoursPerDay = (day) => {
  const hours = [];

  const startHours = moment(day).startOf('day').add(9, 'hour');

  for (let i = 0; i < 8; i += 1) {
    hours.push(startHours.clone().add(i, 'hour'));
  }

  return hours;
};

class NonProfitCalendar extends Component {
  constructor(props) {
    super(props);

    const weekStart = moment().startOf('week');
    const today = moment().startOf('day');
    const upcomingDays = [];

    for (let i = 0; i < 7; i += 1) {
      upcomingDays.push(weekStart.clone().add(i, 'day').startOf('day'));
    }

    const hoursPerDay = [];

    this.state = {
      today,
      upcomingDays,
      hoursPerDay,
    };
  }

  async componentDidMount() {
    const { getAvailabilities } = this.props;

    await getAvailabilities();
  }

  render() {
    const { availability } = this.props;
    const { today, upcomingDays, hoursPerDay } = this.state;

    const { availabilities, loading } = availability;

    return (
      <div className="calendar-container">
        <div className="calendar">
          <div className="calendarHeader">
            {upcomingDays.map((day) => (
              <div
                key={day.toString()}
                className="headerDay"
              >
                {(today.isSame(day)) && (
                  <p className="currentDay">Today</p>
                )}
                <p className="weekDay">{day.format('dddd')}</p>
                <p className="monthDay">{day.format('MMM D')}</p>
              </div>
            ))}
          </div>
          <div className="calendarBody">
            {upcomingDays.map((day) => (
              <div
                key={day.toString()}
                className="dayColumn"
              >
                {getHoursPerDay(day).map((hour) => (
                  <div
                    key={hour.toString()}
                    className="dayHour"
                  >
                    <p
                      className="time"
                      style={{
                        color: loading ? '#CCC' : '#000',
                      }}
                    >
                      {hour.format('h:mm a')}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

NonProfitCalendar.propTypes = {
  getAvailabilities: PropTypes.func.isRequired,
  availability: PropTypes.shape({
    availabilities: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  }),
};

NonProfitCalendar.defaultProps = {
  availability: {
    availabilities: [],
    loading: true,
  },
};

const mapStateToProps = (state) => ({
  availability: state.availability,
});

export default connect(mapStateToProps, {
  getAvailabilities: getAvailabilitiesBase,
})(NonProfitCalendar);
