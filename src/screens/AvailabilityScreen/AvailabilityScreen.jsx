import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
import {
  getAvailabilities as getAvailabilitiesBase,
  addAvailability as addAvailabilityBase,
  deleteAvailability as deleteAvailabilityBase,
} from "../../redux/actions/availabilityActions";
import { addNotification as addNotificationBase } from "../../redux/actions/notificationActions";
import classes from "./AvailabilityScreen.module.css";
import { useUser } from "../../actions/users";
import urls from "../../utils/urls";

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
        team: curDay.team,
        interviewer: curDay.interviewer,
      });
    }
  }

  const startHour = 9;
  const startHours = moment(day).startOf("day").add(startHour, "hour");

  for (let i = 0; i < 8; i += 1) {
    const time = startHours.clone().add(i, "hour");
    let isAvailable = true;
    let id = null;
    let team = null;
    let interviewer = null;

    for (let j = 0; j < availHours.length; j += 1) {
      const curHour = availHours[j];

      if (time.isSame(curHour.startDate, "hour")) {
        isAvailable = !curHour.isBooked;
        id = curHour.id;
        team = curHour.team;
        interviewer = curHour.interviewer;
        break;
      }
    }

    hours.push({
      time,
      isAvailable,
      id,
      teamName: team,
      interviewerName: interviewer,
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

function AvailabilityScreen({
  getAvailabilities,
  availability,
  addAvailability,
  deleteAvailability,
  addNotification,
}) {
  const { user } = useUser({
    redirectTo: urls.pages.index,
  });
  const weekStart = getWeekStart();
  const [upcomingDays, setUpcoming] = React.useState(getUpcoming(weekStart));
  const [selectedDays, setSelDays] = React.useState({});
  const [deselDays, setDeselDays] = React.useState({});
  const [monthYear, setMonthYear] = React.useState(weekStart);
  const [interviewer, setInterviewer] = React.useState("");
  const [firstWeek, setFirstWeek] = React.useState(true);
  const [lastWeek, setLastWeek] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const availabilityCheck = await getAvailabilities();

        const { payload } = availabilityCheck;

        payload.forEach((availability) => {
          setSelDays((prevState) => ({
            ...prevState,
            [moment(availability.startDate).toDate()]: availability._id,
          }));
        });
      } catch (e) {
        await addNotification({
          header: "Failed to retrieve availabilities!",
          body: "Please refresh and try again.",
          type: "error",
          persist: true,
        });
      }
    })();
  }, []);

  const addOrRemoveAvailability = (availableDate) => {
    if (availableDate in selectedDays) {
      if (selectedDays[availableDate] !== -1) {
        const id = selectedDays[availableDate];
        setDeselDays((prevState) => ({
          ...prevState,
          [availableDate]: id,
        }));
      }
      const selectedDaysCopy = selectedDays;
      delete selectedDaysCopy[availableDate];
      setSelDays(selectedDaysCopy);
    } else {
      if (availableDate in deselDays) {
        setSelDays((prevState) => ({
          ...prevState,
          [availableDate]: deselDays[availableDate],
        }));
        setDeselDays((prevState) => ({
          ...prevState,
          [availableDate]: 0,
        }));
        return;
      }

      setSelDays((prevState) => ({
        ...prevState,
        [availableDate]: -1,
      }));
    }
  };

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

  const handleChangeInterviewer = (event) => {
    setInterviewer(event.target.value || null);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    try {
      await Promise.all(
        Object.keys(selectedDays).map(async (date) => {
          if (selectedDays[date] === -1) {
            const availability = {
              startDate: date,
              interviewer,
            };

            await addAvailability(availability);
          }
        })
      );

      await Promise.all(
        Object.keys(deselDays).map(async (date) => {
          if (deselDays[date] !== 0) {
            await deleteAvailability(deselDays[date]);
          }
        })
      );

      await addNotification({
        header: "Successfully updated availabilities!",
        type: "success",
      });
    } catch (e) {
      await addNotification({
        header: "Failed updating availabilities!",
        body: "Please refresh and try again.",
        type: "error",
        persist: true,
      });
    }
  };

  const { availabilities, loading } = availability;

  const endOfDay = moment().endOf("day");

  return (
    <div>
      <h1 style={{ fontWeight: 600, marginLeft: "10%" }}>
        Select your availability
      </h1>
      <span>
        <button
          type="button"
          className="navigationButton"
          style={{ marginLeft: "10%" }}
          onClick={() => getPreviousWeek(monthYear)}
          disabled={firstWeek}
        >
          {"< "}
          Previous Week
        </button>
        <button
          type="button"
          className="navigationButton"
          style={{ marginLeft: "50px" }}
          onClick={() => getNextWeek(monthYear)}
          disabled={lastWeek}
        >
          Next Week
          {" >"}
        </button>
        <div className="dropdown">
          <button
            type="button"
            className="monthSelected"
            style={{
              marginTop: "-40px",
              width: "300px",
              backgroundColor: "#C4C4C4",
              float: "right",
              marginRight: "10%",
            }}
          >
            {monthYear.format("MMMM YYYY")}
          </button>
        </div>
      </span>
      <div className={classes.availcalendarContainer}>
        <div className={classes.availcalendar}>
          <div className={classes.availcalendarHeader}>
            {upcomingDays.map((day) => (
              <div key={day.toString()} className={classes.availheaderDay}>
                <p className="weekDay">{day.format("dddd")}</p>
                <p className="monthDay">{day.format("D")}</p>
              </div>
            ))}
          </div>
          <div className={classes.availcalendarBody}>
            {upcomingDays.map((day) => (
              <div key={day.toString()} className="dayColumn">
                {getHoursPerDay(day, availabilities).map(
                  ({ time, isAvailable, interviewerName, teamName }) => (
                    <button
                      key={time.toString()}
                      type="button"
                      id={isAvailable ? "notBooked" : "booked"}
                      className={clsx(
                        "dayHour",
                        loading || !(time.toDate() in selectedDays)
                          ? classes.availhourDisplay
                          : classes.availhourSelected
                      )}
                      onClick={() => addOrRemoveAvailability(time.toDate())}
                      onKeyDown={() => addOrRemoveAvailability(time.toDate())}
                      disabled={time.isBefore(endOfDay) || !isAvailable}
                    >
                      <p className="time">{time.format("h:mm a")}</p>
                      {interviewerName != null && (
                        <p className={clsx("time", classes.smallText)}>
                          {`Interviewer: ${interviewerName}`}
                        </p>
                      )}
                      {teamName != null && (
                        <p
                          className={clsx("time", classes.smallText)}
                        >{`Team: ${teamName}`}</p>
                      )}
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleAdd}>
        <label htmlFor="interviewer" className="inputInterviewer">
          Interviewer:
          <input
            type="text"
            id="interviewer"
            value={interviewer}
            onChange={handleChangeInterviewer}
            style={{
              marginLeft: "15px",
              borderRadius: "5px",
              border: "1px solid black",
              padding: "0px 15px",
            }}
            required
          />
        </label>
        <button className="submitAvailability" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

AvailabilityScreen.propTypes = {
  getAvailabilities: PropTypes.func.isRequired,
  addAvailability: PropTypes.func.isRequired,
  deleteAvailability: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  availability: PropTypes.shape({
    availabilities: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  }),
};

AvailabilityScreen.defaultProps = {
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
})(AvailabilityScreen);
