import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import {
  getApplications as getApplicationsBase,
  deleteApplication as deleteApplicationBase,
  updateApplicationState as updateApplicationStateBase,
  updateApplicationDecision as updateApplicationDecisionBase,
} from '../redux/actions/applicationActions';

class ApplicationsList extends Component {
  componentDidMount() {
    const { getApplications } = this.props;
    getApplications();
  }

  onDeleteClick = (id) => {
    const { deleteApplication } = this.props;
    deleteApplication(id);
  };

  changeAppState = async (id, state) => {
    const { updateApplicationState } = this.props;
    await updateApplicationState(id, state);
    document.location.reload();
  }

  changeAppDecision = async (id, decision) => {
    const { updateApplicationDecision } = this.props;
    await updateApplicationDecision(id, decision);
    document.location.reload();
  }

  render() {
    const { application } = this.props;
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
              status,
              urlString,
              decision,
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
                    <h2 style={{ fontWeight: '600', paddingRight: '30px' }}>{name}</h2>
                  </div>
                  <ButtonGroup style={{ marginBottom: '30px' }}>
                    <Button
                      color="primary"
                      onClick={() => this.changeAppState(_id, 0)}

                    >
                      Submitted Application
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.changeAppState(_id, 1)}
                    >
                      Schedule Interview
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.changeAppState(_id, 2)}

                    >
                      Interview Scheduled
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.changeAppState(_id, 3)}

                    >
                      Under Review
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.changeAppState(_id, 4)}
                    >
                      Decision Made
                    </Button>
                  </ButtonGroup>
                  <p style={{ fontWeight: '600' }}><a href={`/p/${urlString}`} target="_blank" rel="noopener noreferrer">View Application Page</a></p>
                  <p style={{ fontWeight: '600' }}>Stage: </p>
                  <p>{status}</p>
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
                  <p style={{ fontWeight: '600' }}>Decision: </p>
                  <p>{decision.toString()}</p>
                  <p style={{ fontWeight: '600' }}>Make Decision: </p>
                  <ButtonGroup>
                    <Button onClick={() => this.changeAppDecision(_id, true)}>Accept</Button>
                    <Button onClick={() => this.changeAppDecision(_id, false)}>Decline</Button>
                  </ButtonGroup>
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
  updateApplicationState: PropTypes.func.isRequired,
  updateApplicationDecision: PropTypes.func.isRequired,
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
  updateApplicationState: updateApplicationStateBase,
  updateApplicationDecision: updateApplicationDecisionBase,
})(ApplicationsList);
