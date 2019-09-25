import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';
import ItemsList from '../frontend/components/ItemsList';
import ItemModal from '../frontend/components/ItemModal';
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
  }

  render() {
    const { clients } = this.props;

    console.log(clients);

    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <ItemModal />
          <ItemsList />
        </Container>
      </div>
    );
  }
}

IndexPage.propTypes = {
  clients: PropTypes.array,
};

export default IndexPage;
