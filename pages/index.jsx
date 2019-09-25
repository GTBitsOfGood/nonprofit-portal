import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';
import ItemsList from '../frontend/components/ItemsList';
import ItemModal from '../frontend/components/ItemModal';
import { getItems } from '../frontend/actions/items';

class IndexPage extends React.Component {
  static async getInitialProps({ req }) {
    if (req) {
      // TODO server-side database calls
      const items = await getItems();

      return {
        items,
      };
    }
  }

  render() {
    const { items } = this.props;

    console.log(items);

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
  items: PropTypes.array.isRequired,
};

export default IndexPage;
