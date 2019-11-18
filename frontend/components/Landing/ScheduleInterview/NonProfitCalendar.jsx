import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAvailabilities as getAvailabilitiesBase } from '../../../redux/actions/availabilityActions';
import '../../../static/style/Calendar.css';

const getHoursPerDay = (day, availabilities) => {
  const hours = [];

  const availHours = [];
  for (let i = 0; i < availabilities.length; i += 1) {
    const curDay = availabilities[i];

    const startDate = moment(curDay.startDate);

    if (day.isSame(startDate, 'date')) {
      availHours.push({
        startDate,
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

      if (time.isSame(curHour.startDate, 'hour')) {
        isAvailable = !curHour.isBooked;
        id = curHour.id;
        break;
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

    let weekStart = moment().startOf('week').add(1, 'day');

    if (moment().weekday() >= 5) {
      weekStart = weekStart.add(1, 'weeks').startOf('isoWeek');
    }

    const upcomingDays = [];

    for (let i = 0; i < 5; i += 1) {
      upcomingDays.push(weekStart.clone().add(i, 'day').startOf('day'));
    }

    this.state = {
      upcomingDays,
      monthYear: weekStart,
      firstWeek: true,
      lastWeek: false,
    };
  }

  async componentDidMount() {
    const { getAvailabilities } = this.props;

    await getAvailabilities();
  }

  getNextWeek = (curWeek) => {
    if (curWeek.diff(moment(), 'weeks') > 3) {
      this.setState({
        lastWeek: true,
      });
      return;
    }

    const nextWeek = [];
    const nextDay = curWeek.add(1, 'weeks').startOf('isoWeek');

    for (let i = 0; i < 5; i += 1) {
      nextWeek.push(nextDay.clone().add(i, 'day').startOf('day'));
    }

    this.setState({
      upcomingDays: nextWeek,
      lastWeek: false,
      firstWeek: false,
    });
  }

  getPreviousWeek = (curWeek) => {
    if (moment().weekday() === 5) {
      if (curWeek.isBefore(moment().add(1, 'week'))) {
        this.setState({
          firstWeek: true,
        });
        return;
      }
    }

    if (curWeek.isBefore(moment())) {
      this.setState({
        firstWeek: false,
        lastWeek: false,
      });
      return;
    }
    const prevWeek = [];
    const prevDay = curWeek.subtract(1, 'weeks').startOf('isoWeek');

    for (let i = 0; i < 5; i += 1) {
      prevWeek.push(prevDay.clone().add(i, 'day').startOf('day'));
    }

    this.setState({
      upcomingDays: prevWeek,
      firstWeek: false,
      lastWeek: false,
    });
  }

  render() {
    const { availability, selectedHour, selectHourHandler } = this.props;
    const {
      upcomingDays,
      monthYear,
      firstWeek,
      lastWeek,
    } = this.state;

    const { availabilities, loading } = availability;

    return (
      <div className="calendar-container">
        <span>
          <button
            type="button"
            className="navigationButton"
            onClick={() => this.getPreviousWeek(monthYear)}
            disabled={firstWeek}
          >
            {'< '}
            Previous Week
          </button>
          <button
            type="button"
            className="navigationButton"
            style={{ float: 'right' }}
            onClick={() => this.getNextWeek(monthYear)}
            disabled={lastWeek}

          >
            Next Week
            {' >'}
          </button>
        </span>
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
                  <button
                    type="button"
                    key={time.toString()}
                    className={`dayHour ${((!loading && isAvailable && time.isAfter(moment()))) ? 'hourAvail' : 'hourNotAvail'}${(selectedHour != null && selectedHour === id) ? ' hourSelected' : ''}`}
                    onClick={id != null ? () => selectHourHandler(id) : () => {}}
                    onKeyDown={id != null ? () => selectHourHandler(id) : () => {}}
                  >
                    <p className="time">
                      {time.format('h:mm a')}
                    </p>
                  </button>
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
  selectedHour: PropTypes.string,
};

NonProfitCalendar.defaultProps = {
  availability: {
    availabilities: [],
    loading: true,
  },
  selectedHour: null,
};

const mapStateToProps = (state) => ({
  availability: state.availability,
});

export default connect(mapStateToProps, {
  getAvailabilities: getAvailabilitiesBase,
})(NonProfitCalendar);
