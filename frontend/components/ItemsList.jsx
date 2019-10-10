import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems, deleteItem } from '../redux/actions/itemActions';

class ItemsList extends Component {
  componentDidMount() {
    this.props.getItems();
  };

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="items-list">
            {items.map(({ _id,
              name,
              address,
              website,
              workPhone,
              contactName,
              mobilePhone,
              email,
              mission,
              needsWeb,
              needsMobile,
              needsOther,
              needsOtherExpand,
              stageRadio,
              stageOtherExpand,
              availRadio,
              fieldRadio,
              productExtra,
              feedback,
            }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <br />
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                  Delete
                  </Button>
                  <br />
                  <br />
                  <p style={{ fontWeight: '600' }}>Name: </p>
                  <p>{name}</p>
                  <p style={{ fontWeight: '600' }}>Address: </p>
                  <p>{address}</p>
                  <p style={{ fontWeight: '600' }}>Website: </p>
                  <p><a href={website} target="_blank" rel="noopener noreferrer" >{website}</a></p>
                  <p style={{ fontWeight: '600' }}>Work Phone: </p>
                  <p>{workPhone}</p>
                  <p style={{ fontWeight: '600' }}>Contact Name: </p>
                  <p>{contactName}</p>
                  <p style={{ fontWeight: '600' }}>Mobile Phone: </p>
                  <p>{mobilePhone}</p>
                  <p style={{ fontWeight: '600' }}>Email: </p>
                  <p>{email}</p>
                  <p style={{ fontWeight: '600' }}>Mission: </p>
                  <p>{mission}</p>
                  <p style={{ fontWeight: '600' }}>Needs Web? </p>
                  <p>{needsWeb}</p>
                  <p style={{ fontWeight: '600' }}>Needs Mobile? </p>
                  <p>{needsMobile}</p>
                  <p style={{ fontWeight: '600' }}>Needs Other? </p>
                  <p>{needsOther}</p>
                  <p style={{ fontWeight: '600' }}>If so what: </p>
                  <p>{needsOtherExpand}</p>
                  <p style={{ fontWeight: '600' }}>Stage of Development: </p>
                  <p>{stageRadio}</p>
                  <p style={{ fontWeight: '600' }}>If other, what: </p>
                  <p>{stageOtherExpand}</p>
                  <p style={{ fontWeight: '600' }}>Availability: </p>
                  <p>{availRadio}</p>
                  <p style={{ fontWeight: '600' }}>Field Test? </p>
                  <p>{fieldRadio}</p>
                  <p style={{ fontWeight: '600' }}>Other Product Needs: </p>
                  <p>{productExtra}</p>
                  <p style={{ fontWeight: '600' }}>Feedback: </p>
                  <p>{feedback}</p>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
          <br />
        </ListGroup>
      </Container>
    );
  }
}

ItemsList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ItemsList);
