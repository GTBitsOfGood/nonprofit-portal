import React from 'react';
import PropTypes from 'prop-types';

import { getClients, addClient } from '../frontend/actions/clients';

class IndexPage extends React.Component {
  static async getInitialProps({ req }) {
    if (req) {
      // TODO server-side database calls
      const { clients } = await getClients();

      if (clients.length === 0) {
        await addClient('Test User', 'Test Company');
      }

      return {
        isServer: true,
        clients,
      };
    }

    // TODO client-side API calls
    const { clients } = await getClients();

    return {
      isServer: false,
      clients,
    };
  }

  render() {
    const { clients } = this.props;

    console.log(clients);

    return (
      <div>Hello, World!</div>
    );
  }
}

IndexPage.propTypes = {
  clients: PropTypes.array,
};

export default IndexPage;
