import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAvailabilities as getAvailabilitiesBase } from '../../redux/actions/availabilityActions';
import './calendar.css';

const getHoursPerDay = (day, availabilities) => {
  const hours = [];

  const availHours = [];
  for (let i = 0; i < availabilities.length; i += 1) {
    const curDay = availabilities[i];

    const startDate = moment(curDay.startDate);
    const endDate = moment(curDay.endDate);

    if (day.isSame(startDate, 'date')) {
      availHours.push({
        startDate,
        endDate,
        id: curDay._id,
        isBooked: curDay.isBooked,
      });
    }
  }

  const startHour = 9;
  const startHours = moment(day).startOf('day').add(startHour, 'hour');

  for (let i = 0; i < 8; i += 1) {
    const time = startHours.clone().add(i, 'hour');
    let isAvailable = false;
    let id = null;

    for (let j = 0; j < availHours.length; j += 1) {
      const curHour = availHours[j];

      if (time.isBetween(curHour.startDate, curHour.endDate, null, '(]')) {
        if (!curHour.isBooked) {
          isAvailable = true;
          id = curHour.id;
          break;
        }
      }
    }

    hours.push({
      time,
      isAvailable,
      id,
    });
  }

  return hours;
};

class NonProfitCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    const weekStart = moment().startOf('week').add(1, 'day');
    const upcomingDays = [];

    for (let i = 0; i < 5; i += 1) {
      upcomingDays.push(weekStart.clone().add(i, 'day').startOf('day'));
    }

    this.state = {
      upcomingDays,
    };
  }

  async componentDidMount() {
    const { getAvailabilities } = this.props;

    await getAvailabilities();
  }

  render() {
    const { availability, selectedHour, selectHourHandler } = this.props;
    const { upcomingDays } = this.state;

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
                {getHoursPerDay(day, availabilities).map(({ time, isAvailable, id }) => (
                  <div
                    key={time.toString()}
                    className={`dayHour ${(loading || !isAvailable) ? 'hourNotAvail' : 'hourAvail'}${(selectedHour != null && selectedHour === id) ? ' hourSelected' : ''}`}
                    onClick={id != null ? () => selectHourHandler(id) : () => {}}
                  >
                    <p className="time">
                      {time.format('h:mm a')}
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
  selectHourHandler: PropTypes.func.isRequired,
  selectedHour: PropTypes.string.isRequired,
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
