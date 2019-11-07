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
    let isAvailable = true;

    for (let j = 0; j < availHours.length; j += 1) {
      const curHour = availHours[j];

      if (time.isBetween(curHour.startDate, curHour.endDate, null, '[]')) {
        if (!curHour.isBooked) {
          isAvailable = true;
          break;
        }
      }
    }

    hours.push({
      time,
      isAvailable,
      id: null,
    });
  }

  return hours;
};

class AdminCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    const weekStart = moment().startOf('week').add(1, 'day');
    const upcomingDays = [];
    const upcomingMonths = [];


    for (let i = 0; i < 5; i += 1) {
      upcomingDays.push(weekStart.clone().add(i, 'day').startOf('day'));
    }

    for (let i = 0; i < 2; i += 1) {
      upcomingMonths.push(moment().add(i, 'month'));
    }

    this.state = {
      upcomingDays,
      selectedDays: {},
      monthYear: moment(),
      upcomingMonths,
    };
  }

  async componentDidMount() {
    const { getAvailabilities } = this.props;

    await getAvailabilities();
  }

  addOrRemoveAvailability = (availableDate) => {
    const { selectedDays } = this.state;

    if (availableDate in selectedDays) {
      const selectedDaysCopy = selectedDays;
      delete selectedDaysCopy[availableDate];
      this.setState({
        selectedDays: selectedDaysCopy,
      });
      this.forceUpdate();
    } else {
      this.setState((prevState) => ({
        selectedDays: {
          ...prevState.selectedDays,
          [availableDate]: 1,
        },
      }));
    }
  }

  getNextWeek = (curWeek) => {
    if (curWeek.diff(moment(), 'weeks') > 3) {
      return;
    }

    const nextWeek = [];
    const nextDay = curWeek.add(1, 'weeks').startOf('isoWeek');

    for (let i = 0; i < 5; i += 1) {
      nextWeek.push(nextDay.clone().add(i, 'day').startOf('day'));
    }

    this.setState({
      upcomingDays: nextWeek,
    });
  }

  getPreviousWeek = (curWeek) => {
    if (curWeek.isBefore(moment())) {
      return;
    }
    const prevWeek = [];
    const prevDay = curWeek.subtract(1, 'weeks').startOf('isoWeek');

    for (let i = 0; i < 5; i += 1) {
      prevWeek.push(prevDay.clone().add(i, 'day').startOf('day'));
    }

    this.setState({
      upcomingDays: prevWeek,
    });
  }

  updateMonthYear = (selectedMonth) => {
    this.setState({
      monthYear: selectedMonth,
    });
  }

  render() {
    const { availability } = this.props;
    const {
      upcomingDays,
      selectedDays,
      monthYear,
      upcomingMonths,
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
          >
            {'< '}
            Previous Week
          </button>
          <button
            type="button"
            className="navigationButton"
            style={{ marginLeft: '50px' }}
            onClick={() => this.getNextWeek(monthYear)}
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
            {/* <div className="dropdownMonthList">
              {upcomingMonths.map((month) => (
                <button
                  key={month}
                  className="monthItem"
                  type="button"
                  onClick={() => this.updateMonthYear(month)}
                >
                  {month.format('MMMM YYYY')}
                </button>
              ))}
            </div> */}
          </div>
        </span>
        <div className="admincalendar-container">
          <div className="admincalendar">
            <div className="admincalendarHeader">
              {upcomingDays.map((day) => (
                <div
                  key={day.toString()}
                  className="adminheaderDay"
                >
                  <p className="weekDay">{day.format('dddd')}</p>
                  <p className="monthDay">{day.format('D')}</p>
                </div>
              ))}
            </div>
            <div className="admincalendarBody">
              {upcomingDays.map((day) => (
                <div
                  key={day.toString()}
                  className="dayColumn"
                >
                  {getHoursPerDay(day, availabilities).map(({ time, isSelected }) => (
                    <button
                      key={time.toString()}
                      type="button"
                      className={`dayHour ${((loading || !isSelected) && !(time in selectedDays)) ? 'adminhourDisplay' : 'adminhourSelected'}`}
                      onClick={() => this.addOrRemoveAvailability(time)}
                      onKeyDown={() => this.addOrRemoveAvailability(time)}
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
        <p className="inputInterviewer">
          Interviewer:
          <input type="text" name="interviewer" style={{ marginLeft: '15px', borderRadius: '5px', border: '1px solid black' }} />
        </p>
        <button className="submitAvailability" type="submit">Submit</button>
      </div>
    );
  }
}

AdminCalendar.propTypes = {
  getAvailabilities: PropTypes.func.isRequired,
  availability: PropTypes.shape({
    availabilities: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  }),
};

AdminCalendar.defaultProps = {
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
})(AdminCalendar);
