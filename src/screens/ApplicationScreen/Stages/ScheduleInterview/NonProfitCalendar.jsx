import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAvailabilities as getAvailabilitiesBase } from "../../../../redux/actions/availabilityActions";
import { addNotification as addNotificationBase } from "../../../../redux/actions/notificationActions";

const getHoursPerDay = (day, availabilities) => {
  const hours = [];

  const availHours = [];
  for (let i = 0; i < availabilities.length; i += 1) {
    const curDay = availabilities[i];

    const startDate = moment(curDay.startDate);

    if (day.isSame(startDate, "date")) {
      availHours.push({
        startDate,
        id: curDay._id,
        isBooked: curDay.isBooked,
      });
    }
  }

  const startHour = 9;
  const startHours = moment(day).startOf("day").add(startHour, "hour");

  for (let i = 0; i < 8; i += 1) {
    const time = startHours.clone().add(i, "hour");
    let isAvailable = false;
    let id = null;

    for (let j = 0; j < availHours.length; j += 1) {
      const curHour = availHours[j];

      if (time.isSame(curHour.startDate, "hour")) {
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

const getWeekStart = () => {
  let weekStart = moment().startOf("week").add(1, "day");

  if (moment().weekday() >= 5) {
    weekStart = weekStart.add(1, "weeks").startOf("isoWeek");
  }

  return weekStart;
};

const getUpcoming = (weekStart) => {
  const upcomingDays = [];

  for (let i = 0; i < 5; i += 1) {
    upcomingDays.push(weekStart.clone().add(i, "day").startOf("day"));
  }

  return upcomingDays;
};

function NonProfitCalendar({
  getAvailabilities,
  addNotification,
  availability,
  selectedHour,
  selectHourHandler,
}) {
  const { availabilities, loading } = availability;
  const weekStart = getWeekStart();
  const [upcomingDays, setUpcoming] = React.useState(getUpcoming(weekStart));
  const [firstWeek, setFirstWeek] = React.useState(true);
  const [lastWeek, setLastWeek] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        await getAvailabilities();
      } catch (error) {
        await addNotification({
          header: "Failed to retrieve availabilities!",
          body: "Please refresh and try again.",
          type: "error",
          persist: true,
        });
      }
    })();
  }, [getAvailabilities, addNotification]);

  const getNextWeek = (curWeek) => {
    if (curWeek.diff(moment(), "weeks") > 3) {
      setLastWeek(true);
      return;
    }

    const nextWeek = [];
    const nextDay = curWeek.add(1, "weeks").startOf("isoWeek");

    for (let i = 0; i < 5; i += 1) {
      nextWeek.push(nextDay.clone().add(i, "day").startOf("day"));
    }

    setUpcoming(nextWeek);
    setLastWeek(false);
    setFirstWeek(false);
  };

  const getPreviousWeek = (curWeek) => {
    if (moment().weekday() === 5) {
      if (curWeek.isBefore(moment().add(1, "week"))) {
        setFirstWeek(true);
        return;
      }
    }

    if (curWeek.isBefore(moment())) {
      setFirstWeek(false);
      setLastWeek(false);
      return;
    }
    const prevWeek = [];
    const prevDay = curWeek.subtract(1, "weeks").startOf("isoWeek");

    for (let i = 0; i < 5; i += 1) {
      prevWeek.push(prevDay.clone().add(i, "day").startOf("day"));
    }

    setUpcoming(prevWeek);
    setFirstWeek(false);
    setLastWeek(false);
  };

  return (
    <div className="calendar-container">
      <span>
        <button
          type="button"
          className="navigationButton"
          onClick={() => getPreviousWeek(monthYear)}
          disabled={firstWeek}
        >
          {"< "}
          Previous Week
        </button>
        <button
          type="button"
          className="navigationButton"
          style={{ float: "right" }}
          onClick={() => getNextWeek(monthYear)}
          disabled={lastWeek}
        >
          Next Week
          {" >"}
        </button>
      </span>
      <div className="calendar">
        <div className="calendarHeader">
          {upcomingDays.map((day) => (
            <div key={day.toString()} className="headerDay">
              <p className="weekDay">{day.format("dddd")}</p>
              <p className="monthDay">{day.format("MMM D")}</p>
            </div>
          ))}
        </div>
        <div className="calendarBody">
          {upcomingDays.map((day) => (
            <div key={day.toString()} className="dayColumn">
              {getHoursPerDay(day, availabilities).map(
                ({ time, isAvailable, id }) => (
                  <button
                    type="button"
                    key={time.toString()}
                    className={`dayHour ${
                      !loading && isAvailable && time.isAfter(moment())
                        ? "hourAvail"
                        : "hourNotAvail"
                    }${
                      selectedHour != null && selectedHour === id
                        ? " hourSelected"
                        : ""
                    }`}
                    onClick={
                      id != null ? () => selectHourHandler(id) : () => {}
                    }
                    onKeyDown={
                      id != null ? () => selectHourHandler(id) : () => {}
                    }
                  >
                    <p className="time">{time.format("h:mm a")}</p>
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

NonProfitCalendar.propTypes = {
  getAvailabilities: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
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
  addNotification: addNotificationBase,
})(NonProfitCalendar);
