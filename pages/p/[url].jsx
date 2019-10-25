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
    // if (req) {
    // TODO server-side database calls
    const urlString = router.query.url;
    const application = await getApplication(router.query.url);

    return {
      application,
      urlString,
    };
    // }
  }

  render() {
    const { application, urlString } = this.props;

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
  application: PropTypes.object.isRequired,
  urlString: PropTypes.string.isRequired,
};

export default withRouter(LandingPage);
