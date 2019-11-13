import React from 'react';
import PropTypes from 'prop-types';
import AppSubmittedBody from './AppSubmittedBody';
import ScheduleInterviewBody from './ScheduleInterviewBody/ScheduleInterviewBody';
import InterviewScheduledBody from './InterviewScheduledBody';
import UnderReviewBody from './UnderReviewBody';
import DecisionMadeBody from './DecisionMadeBody';

const getLandingBody = (status, decision, name, applicationId) => {
  switch (status) {
    default:
      return <AppSubmittedBody />;
    case 1:
      return <ScheduleInterviewBody name={name} applicationId={applicationId} />;
    case 2:
      return <InterviewScheduledBody />;
    case 3:
      return <UnderReviewBody />;
    case 4:
      return <DecisionMadeBody decision={decision} />;
  }
};

const LandingBody = (props) => {
  const { status, decision, name, applicationId } = props;

  return (
    <div style={{ marginTop: '50px', height: '100%', marginBottom: '60px' }}>
      {getLandingBody(status, decision, name, applicationId)}
    </div>
  );
};

LandingBody.propTypes = {
  status: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  decision: PropTypes.bool,
  applicationId: PropTypes.string.isRequired,
};

LandingBody.defaultProps = {
  decision: null,
};

export default LandingBody;
