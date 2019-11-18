import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { withRouter } from 'next/router';

import StatusJumbo from '../../frontend/components/StatusJumbo';
import StatusBar from '../../frontend/components/StatusBar';
import LandingBody from '../../frontend/components/LandingBody';
import { getApplication } from '../../frontend/actions/applications';
import { getAvailability } from '../../frontend/actions/availabilities';

class LandingPage extends React.Component {
  static async getInitialProps(router) {
    const urlString = router.query.url;
    const application = await getApplication(router.query.url);

    if (application.meeting != null) {
      const meeting = await getAvailability(application.meeting);

      return {
        application,
        urlString,
        meeting,
      };
    }

    return {
      application,
      urlString,
    };
  }

  render() {
    const { application, meeting } = this.props;

    return (
      <Container>
        <StatusJumbo
          status={application.status}
          name={application.name}
          decision={application.decision}
        />
        <StatusBar status={application.status} />
        <LandingBody
          status={application.status}
          name={application.name}
          decision={application.decision}
          applicationId={application._id}
          meeting={meeting}
        />
      </Container>
    );
  }
}

LandingPage.propTypes = {
  application: PropTypes.shape({
    _id: PropTypes.string,
    address: PropTypes.string,
    availRadio: PropTypes.string,
    contactName: PropTypes.string,
    decision: PropTypes.bool,
    email: PropTypes.string,
    feedback: PropTypes.string,
    fieldRadio: PropTypes.string,
    mission: PropTypes.string,
    mobilePhone: PropTypes.string,
    name: PropTypes.string,
    needsWeb: PropTypes.string,
    productExtra: PropTypes.string,
    stageRadio: PropTypes.string,
    status: PropTypes.number,
    urlString: PropTypes.string,
    website: PropTypes.string,
    workPhone: PropTypes.string,
  }).isRequired,
  meeting: PropTypes.shape({
    _id: PropTypes.string,
    isBooked: PropTypes.bool,
    team: PropTypes.string,
    startDate: PropTypes.string,
  }),
};

LandingPage.defaultProps = {
  meeting: null,
};

export default withRouter(LandingPage);
