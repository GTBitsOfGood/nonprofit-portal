import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../redux/actions/itemActions';

class ItemModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      item: '',
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      contactName: this.state.contactName,
      reason: this.state.reason,
      website: this.state.website,
    };
    console.log(newItem)

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Create Application
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Application</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Organization Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Organization Name"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="item">Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="item"
                  placeholder="Organization Address"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="item">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="item"
                  placeholder="Organization Email"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="item">Contact Name</Label>
                <Input
                  type="text"
                  name="contactName"
                  id="item"
                  placeholder="Contact Name"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="item">How do you serve the community?</Label>
                <Input
                  type="textarea"
                  name="reason"
                  id="item"
                  placeholder="Tell us a bit about your organization"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="item">Website</Label>
                <Input
                  type="url"
                  name="website"
                  id="item"
                  placeholder="Website Link"
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
              >
                Submit Application
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
