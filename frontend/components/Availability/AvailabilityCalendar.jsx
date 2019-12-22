import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getAvailabilities as getAvailabilitiesBase,
  addAvailability as addAvailabilityBase,
  deleteAvailability as deleteAvailabilityBase,
} from '../../redux/actions/availabilityActions';
import {
  addNotification as addNotificationBase,
} from '../../redux/actions/notificationActions';
import './AvailabilityCalendar.css';
import '../../static/style/Calendar.css';

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
    let isAvailable = true;
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

class AvailabilityCalendar extends React.PureComponent {
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
      selectedDays: {},
      deselectedDays: {},
      monthYear: weekStart,
      interviewer: '',
      firstWeek: true,
      lastWeek: false,
    };
  }

  async componentDidMount() {
    const { getAvailabilities, addNotification } = this.props;

    try {
      const availabilityCheck = await getAvailabilities();

      const { payload } = availabilityCheck;

      payload.forEach((availability) => {
        this.setState((prevState) => ({
          selectedDays: {
            ...prevState.selectedDays,
            [moment(availability.startDate).toDate()]: availability._id,
          },
        }));
      });
    } catch (e) {
      await addNotification({
        header: 'Failed to retrieve availabilities!',
        body: 'Please refresh and try again.',
        type: 'error',
      });
    }
  }

  addOrRemoveAvailability = (availableDate) => {
    const { selectedDays, deselectedDays } = this.state;

    if (availableDate in selectedDays) {
      if (selectedDays[availableDate] !== -1) {
        const id = selectedDays[availableDate];
        this.setState((prevState) => ({
          deselectedDays: {
            ...prevState.deselectedDays,
            [availableDate]: id,
          },
        }));
      }
      const selectedDaysCopy = selectedDays;
      delete selectedDaysCopy[availableDate];
      this.setState({
        selectedDays: selectedDaysCopy,
      });
      this.forceUpdate();
    } else {
      if (availableDate in deselectedDays) {
        this.setState((prevState) => ({
          selectedDays: {
            ...prevState.selectedDays,
            [availableDate]: deselectedDays[availableDate],
          },
          deselectedDays: {
            ...prevState.deselectedDays,
            [availableDate]: 0,
          },
        }));
        this.forceUpdate();
        return;
      }

      this.setState((prevState) => ({
        selectedDays: {
          ...prevState.selectedDays,
          [availableDate]: -1,
        },
      }));
    }
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

  handleChangeInterviewer = (event) => {
    let eventClone = event.target.value;
    if (eventClone === '') {
      eventClone = null;
    }
    this.setState({
      interviewer: eventClone,
    });
  }

  addAvailability = async (event) => {
    event.preventDefault();

    const { addAvailability, deleteAvailability, addNotification } = this.props;
    const {
      selectedDays,
      deselectedDays,
      interviewer,
    } = this.state;

    try {
      Object.keys(selectedDays).forEach((date) => {
        if (selectedDays[date] === -1) {
          const availability = {
            startDate: date,
            interviewer,
          };

          addAvailability(availability);
        }
      });

      Object.keys(deselectedDays).forEach((date) => {
        if (deselectedDays[date] !== 0) {
          deleteAvailability(deselectedDays[date]);
        }
      });

      await addNotification({
        header: 'Successfully updated availabilities!',
        type: 'success',
      });
    } catch (e) {
      await addNotification({
        header: 'Failed update availabilities!',
        body: 'Please refresh and try again.',
        type: 'error',
      });
    }
  }

  render() {
    const { availability } = this.props;
    const {
      upcomingDays,
      selectedDays,
      monthYear,
      interviewer,
      firstWeek,
      lastWeek,
    } = this.state;
    const { availabilities, loading } = availability;

    return (
      <div>
        <h1 style={{ fontWeight: 600, marginLeft: '10%' }}>Select your availability</h1>
        <span>
          <button
            type="button"
            className="navigationButton"
            style={{ marginLeft: '10%' }}
            onClick={() => this.getPreviousWeek(monthYear)}
            disabled={firstWeek}
          >
            {'< '}
            Previous Week
          </button>
          <button
            type="button"
            className="navigationButton"
            style={{ marginLeft: '50px' }}
            onClick={() => this.getNextWeek(monthYear)}
            disabled={lastWeek}
          >
            Next Week
            {' >'}
          </button>
          <div className="dropdown">
            <button
              type="button"
              className="monthSelected"
              style={{
                marginTop: '-40px',
                width: '300px',
                backgroundColor: '#C4C4C4',
                float: 'right',
                marginRight: '10%',
              }}
            >
              {monthYear.format('MMMM YYYY')}
            </button>
          </div>
        </span>
        <div className="availcalendar-container">
          <div className="availcalendar">
            <div className="availcalendarHeader">
              {upcomingDays.map((day) => (
                <div
                  key={day.toString()}
                  className="availheaderDay"
                >
                  <p className="weekDay">{day.format('dddd')}</p>
                  <p className="monthDay">{day.format('D')}</p>
                </div>
              ))}
            </div>
            <div className="availcalendarBody">
              {upcomingDays.map((day) => (
                <div
                  key={day.toString()}
                  className="dayColumn"
                >
                  {getHoursPerDay(day, availabilities).map(({ time, isAvailable }) => (
                    <button
                      key={time.toString()}
                      type="button"
                      id={isAvailable ? 'notBooked' : 'booked'}
                      className={`dayHour ${(loading || !(time.toDate() in selectedDays)) ? 'availhourDisplay' : 'availhourSelected'}`}
                      onClick={() => this.addOrRemoveAvailability(time.toDate())}
                      onKeyDown={() => this.addOrRemoveAvailability(time.toDate())}
                      disabled={time.isBefore(moment()) || !isAvailable || time.isSame(moment(), 'day')}
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
        <form onSubmit={this.addAvailability}>
          <label htmlFor="interviewer" className="inputInterviewer">
            Interviewer:
            <input
              type="text"
              id="interviewer"
              value={interviewer}
              onChange={this.handleChangeInterviewer}
              style={{
                marginLeft: '15px',
                borderRadius: '5px',
                border: '1px solid black',
                padding: '0px 15px',
              }}
              required
            />
          </label>
          <button className="submitAvailability" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

AvailabilityCalendar.propTypes = {
  getAvailabilities: PropTypes.func.isRequired,
  addAvailability: PropTypes.func.isRequired,
  deleteAvailability: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  availability: PropTypes.shape({
    availabilities: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  }),
};

AvailabilityCalendar.defaultProps = {
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
  addAvailability: addAvailabilityBase,
  deleteAvailability: deleteAvailabilityBase,
  addNotification: addNotificationBase,
})(AvailabilityCalendar);
