import React from 'react';
import PropTypes from 'prop-types';
import AppSubmittedBody from './AppSubmittedBody';
import ScheduleInterviewBody from './ScheduleInterviewBody/ScheduleInterviewBody';
import InterviewScheduledBody from './InterviewScheduledBody';
import UnderReviewBody from './UnderReviewBody';
import DecisionMadeBody from './DecisionMadeBody';

const getLandingBody = (status, decision) => {
  switch (status) {
    default:
      return <AppSubmittedBody />;
    case 1:
      return <ScheduleInterviewBody />;
    case 2:
      return <InterviewScheduledBody />;
    case 3:
      return <UnderReviewBody />;
    case 4:
      return <DecisionMadeBody decision={decision} />;
  }
};

const LandingBody = (props) => {
  const { status, decision } = props;

  return (
    <div style={{ marginTop: '50px', height: '100%', marginBottom: '60px' }}>
      {getLandingBody(status, decision)}
    </div>
  );
};

LandingBody.defaultProps = {
  decision: null,
};

LandingBody.propTypes = {
  status: PropTypes.number.isRequired,
  decision: PropTypes.bool,
};

export default LandingBody;
