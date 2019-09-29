import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
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
      <h1>{urlString}</h1>
    );
  }
}

LandingPage.propTypes = {
  item: PropTypes.object.isRequired,
  urlString: PropTypes.string.isRequired,
};

export default withRouter(LandingPage);
