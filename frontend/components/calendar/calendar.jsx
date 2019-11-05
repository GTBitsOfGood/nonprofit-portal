import React, { Component } from 'react';
import moment, { weekdays } from 'moment';
import '../../static/style/calendar.css';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.width = props.width || '350px';
    this.style = {
      position: 'relative',
      margin: '50px auto',
    };
    this.state = {
      momentContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: false,
    };

    this.weekdays = moment.weekdays();
    this.weekdaysShort = moment.weekdaysShort();
    this.months = moment.months();
  }

  year = () => {
    return this.state.dateContext.format('Y');
  }

  month = () => {
    return this.state.dateContext.format('MMMM');
  }

  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }

  currentDate = () => {
    return this.state.dateContext.get('date');
  }

  currentDay = () => {
    return this.state.dateContext.format('D');
  }

  render() {
    return (
      <div className="calendar-container">
        <h2>Calendar</h2>
      </div>
    );
  }
}
