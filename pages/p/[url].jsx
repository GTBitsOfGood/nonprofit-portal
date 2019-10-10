import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { withRouter } from 'next/router';

import AppNavbar from '../../frontend/components/AppNavbar';
import StatusJumbo from '../../frontend/components/StatusJumbo';
import StatusBar from '../../frontend/components/StatusBar';

import { getItem } from '../../frontend/actions/items';

class LandingPage extends React.Component {
  static async getInitialProps(router) {
    // if (req) {
    // TODO server-side database calls
    const urlString = router.query.url;
    const item = await getItem(router.query.url);

    return {
      item,
      urlString,
    };
    // }
  }

  render() {
    const { item, urlString } = this.props;

    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <StatusJumbo status={item.status} />
          <StatusBar status={item.status} />
        </Container>
      </div>
    );
  }
}

LandingPage.propTypes = {
  item: PropTypes.object.isRequired,
  urlString: PropTypes.string.isRequired,
};

export default withRouter(LandingPage);
