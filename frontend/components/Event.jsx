import React, { Component } from 'react';
import {
  Container,
  Button,
} from 'reactstrap';

class Event extends Component {
  bookDate = async (id) => {
    const { updateEventBooking } = this.props;
    await updateEventBooking(id);
  }

  render() {
    const { availability } = this.props;

    return (
      <Container>
        <Button
          className="remove-btn"
          color="danger"
          size="sm"
          style={{ marginRight: '20px' }}
          onClick={() => this.bookDate(availability._id)}
        >
          <h1>{availability.startDate}</h1>
          <h1>{availability.endDate}</h1>
        </Button>
      </Container>
    );
  }
}

export default Event;
