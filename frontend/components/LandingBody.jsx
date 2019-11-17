import React from 'react';
import PropTypes from 'prop-types';
import AppSubmittedBody from './AppSubmittedBody';
import ScheduleInterviewBody from './ScheduleInterviewBody/ScheduleInterviewBody';
import InterviewScheduledBody from './InterviewScheduledBody/InterviewScheduledBody';
import UnderReviewBody from './UnderReviewBody';
import DecisionMadeBody from './DecisionMadeBody';

const getLandingBody = (status, decision, name, applicationId, meeting) => {
  switch (status) {
    default:
      return <AppSubmittedBody />;
    case 1:
      return <ScheduleInterviewBody name={name} applicationId={applicationId} />;
    case 2:
      return <InterviewScheduledBody meeting={meeting} />;
    case 3:
      return <UnderReviewBody />;
    case 4:
      return <DecisionMadeBody decision={decision} />;
  }
};

const LandingBody = (props) => {
  const {
    status, decision, name, applicationId, meeting,
  } = props;

  return (
    <div style={{ marginTop: '50px', height: '100%', marginBottom: '60px' }}>
      {getLandingBody(status, decision, name, applicationId, meeting)}
    </div>
  );
};

LandingBody.propTypes = {
  status: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  decision: PropTypes.bool,
  applicationId: PropTypes.string.isRequired,
  meeting: PropTypes.shape({
    _id: PropTypes.string,
    isBooked: PropTypes.bool,
    team: PropTypes.string,
    startDate: PropTypes.string,
  }),
};

LandingBody.defaultProps = {
  decision: null,
  meeting: null,
};

export default LandingBody;
