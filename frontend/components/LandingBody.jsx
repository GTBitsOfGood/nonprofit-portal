import PropTypes from 'prop-types';
import AppSubmittedBody from './AppSubmittedBody';
import ScheduleInterviewBody from './ScheduleInterviewBody';
import InterviewScheduledBody from './InterviewScheduledBody';
import UnderReviewBody from './UnderReviewBody';
import DecisionMadeBody from './DecisionMadeBody';

const LandingBody = (props) => {
  const { status, decision } = props;

  const getLandingBody = () => {
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

  return (
    <div style={{ marginTop: '50px' }}>
      {getLandingBody()}
    </div>
  );
};

LandingBody.propTypes = {
  status: PropTypes.number.isRequired,
  decision: PropTypes.bool.isRequired,
};

export default LandingBody;
