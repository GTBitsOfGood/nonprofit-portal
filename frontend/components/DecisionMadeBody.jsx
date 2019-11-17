import React from 'react';
import PropTypes from 'prop-types';
import LandingBodyMessage from './LandingBodyMessage';
import LandingImage from './LandingImage';

const DecisionMadeBody = (props) => {
  const { decision } = props;

  if (decision === true) {
    return (
      <>
        <LandingBodyMessage width={750}>
        Congratulations! After careful consideration, our team has decided to work with you next
        semester! We enjoyed the meeting with you and believe that our missions align with each
        other. Let’s build a powerful and meaningful product together to make our community better!
        </LandingBodyMessage>
        <LandingImage src="/static/happy.svg" alt="Application submitted" />
      </>
    );
  }

  return (
    <>
      <LandingBodyMessage width={750}>
      After careful considerations, we are sorry to inform you that we decide not to move on with
      your application. We enjoyed learning about your organization and its impact on the community.
      We appreciate your time and work! Keep in touch!
      </LandingBodyMessage>
      <LandingImage src="/static/sad.svg" alt="Application submitted" />
    </>
  );
};

DecisionMadeBody.propTypes = {
  decision: PropTypes.bool.isRequired,
};

export default DecisionMadeBody;
