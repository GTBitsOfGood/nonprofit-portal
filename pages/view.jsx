import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';
import ApplicationsList from '../frontend/components/ApplicationsList';
import { getApplications } from '../frontend/actions/applications';

class IndexPage extends React.Component {
  static async getInitialProps({ req }) {
    if (req) {
      // TODO server-side database calls
      const applications = await getApplications();

      return {
        applications,
      };
    }
  }

  render() {
    const { applications } = this.props;

    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <ApplicationsList />
        </Container>
      </div>
    );
  }
}

IndexPage.propTypes = {
  applications: PropTypes.array.isRequired,
};

export default IndexPage;
