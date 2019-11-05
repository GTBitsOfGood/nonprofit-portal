import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getAvailabilities as getAvailabilitiesBase } from '../../redux/actions/availabilityActions';
import '../../static/style/calendar.css';

class NonProfitCalendar extends Component {
  constructor(props) {
    super(props);

    const today = moment();
    const upcomingDays = [today];

    this.state = {
      today,
      upcomingDays,
    };
  }

  async componentDidMount() {
    const { getAvailabilities } = this.props;

    await getAvailabilities();
  }

  render() {
    const { availability } = this.props;
    const { today, upcomingDays } = this.state;

    const { availabilities, loading } = availability;

    return (
      <div className="calendar-container">
        <h2>Calendar</h2>
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
