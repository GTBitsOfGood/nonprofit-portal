import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  getApplications as getApplicationsBase,
  deleteApplication as deleteApplicationBase,
} from '../redux/actions/applicationActions';

class ApplicationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { getApplications } = this.props;

    getApplications();
  }

  onDeleteClick = (id) => {
    const { deleteApplication } = this.props;

    deleteApplication(id);
  };

  toggleCollapse = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  render() {
    const { application } = this.props;
    const { open } = this.state;

    const { applications } = application;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="applications-list">
            {applications.map(({
              _id,
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
                  <div style={{ display: 'flex', margin: '30px 0' }}>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      style={{ marginRight: '20px' }}
                      onClick={() => this.onDeleteClick(_id)}
                    >
                      <h5>Delete</h5>
                    </Button>
                    <h2 style={{ fontWeight: '600' }}>{name}</h2>
                  </div>
                  <Button color="#F0F4F7" onClick={this.toggleCollapse} style={{ marginBottom: '1rem' }} block>
                    <div align="left">
                      <h4>
                        {open ? (
                          <FontAwesomeIcon icon={faChevronDown} size="sm" />
                        ) : (
                          <FontAwesomeIcon icon={faChevronRight} size="sm" />
                        )}
                        {' '}
                      View Application
                      </h4>
                    </div>
                  </Button>
                  <Collapse isOpen={open}>
                    <p style={{ fontWeight: '600' }}>Address: </p>
                    <p>{address}</p>
                    <p style={{ fontWeight: '600' }}>Website: </p>
                    <p><a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
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
                  </Collapse>
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

ApplicationsList.propTypes = {
  getApplications: PropTypes.func.isRequired,
  deleteApplication: PropTypes.func.isRequired,
  application: PropTypes.shape({
    applications: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  application: state.application,
});

export default connect(mapStateToProps, {
  getApplications: getApplicationsBase,
  deleteApplication: deleteApplicationBase,
})(ApplicationsList);
