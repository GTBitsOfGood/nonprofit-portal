import PropTypes from 'prop-types';
import LandingBodyMessage from './LandingBodyMessage';

const DecisionMadeBody = (props) => {
  const { decision } = props;

  if (decision === true) {
    return (
      <LandingBodyMessage width={750}>
      Congratulations! After careful considerations, we decide that... We enjoyed the meeting
      with you and believe that our missions align with each other. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Vel interdum facilisi risus donec egestas nisi malesuada eget.
      Vitae adipiscing sem fermentum leo sollicitudin. Mollis leo nisl id ac lacus vestibulum amet,
      feugiat ut. Sed leo id semper est in iaculis.
      </LandingBodyMessage>
    );
  }
  return (
    <LandingBodyMessage width={750}>
    Congratulations! After careful considerations, we decide that... We enjoyed the meeting
    with you and believe that our missions align with each other. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Vel interdum facilisi risus donec egestas nisi malesuada eget.
    Vitae adipiscing sem fermentum leo sollicitudin. Mollis leo nisl id ac lacus vestibulum amet,
    feugiat ut. Sed leo id semper est in iaculis.
    </LandingBodyMessage>
  );
};

DecisionMadeBody.propTypes = {
  decision: PropTypes.bool.isRequired,
};

export default DecisionMadeBody;
