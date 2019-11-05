import React, { Component } from 'react';
import moment from 'moment';
import '../../static/style/calendar.css';

export default class Calendar extends Component {
  render() {
    return (
      <div className="calendar-container" style={this.style}>
        <table className="calendar">
          <thead>
            <tr className="calendar-header">
              <td colSpan="5" />
              <td colSpan="2" className="nav-month" />
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    );
  }
}
