import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { withRouter } from 'next/router';

import AppNavbar from '../../frontend/components/AppNavbar';
import StatusJumbo from '../../frontend/components/StatusJumbo';
import StatusBar from '../../frontend/components/StatusBar';
import LandingBody from '../../frontend/components/LandingBody';

import { getApplication } from '../../frontend/actions/applications';

class LandingPage extends React.Component {
  static async getInitialProps(router) {
    const urlString = router.query.url;
    const application = await getApplication(router.query.url);

    return {
      application,
      urlString,
    };
  }

  render() {
    const { application } = this.props;

    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <StatusJumbo status={application.status} name={application.name} />
          <StatusBar status={application.status} />
          <LandingBody
            status={application.status}
            decision={application.decision}
          />
        </Container>
      </div>
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
};

export default withRouter(LandingPage);
