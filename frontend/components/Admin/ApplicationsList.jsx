import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  ButtonGroup,
} from 'reactstrap';
import { TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import {
  getApplications as getApplicationsBase,
  deleteApplication as deleteApplicationBase,
  updateApplicationState as updateApplicationStateBase,
  updateApplicationDecision as updateApplicationDecisionBase,
} from '../../redux/actions/applicationActions';
import {
  addNotification as addNotificationBase,
} from '../../redux/actions/notificationActions';

class ApplicationsList extends Component {
  componentDidMount() {
    const { getApplications, addNotification } = this.props;

    getApplications()
      .catch(async () => {
        await addNotification({
          header: 'Failed retrieving applications!',
          body: 'Please refresh and try again.',
          type: 'error',
        });
      });
  }

  onDeleteClick = async (id) => {
    const { deleteApplication, addNotification } = this.props;

    await deleteApplication(id)
      .catch(async () => {
        await addNotification({
          header: 'Failed to delete application!',
          body: 'Please refresh and try again.',
          type: 'error',
        });
      });
  };

  changeAppState = async (id, state) => {
    const { updateApplicationState, addNotification } = this.props;

    await updateApplicationState(id, state)
      .catch(async () => {
        await addNotification({
          header: 'Failed to change application state!',
          body: 'Please refresh and try again.',
          type: 'error',
        });
      });
  };

  changeAppDecision = async (id, decision) => {
    const { updateApplicationDecision, addNotification } = this.props;

    await updateApplicationDecision(id, decision)
      .catch(async () => {
        await addNotification({
          header: 'Failed to change application decision!',
          body: 'Please refresh and try again.',
          type: 'error',
        });
      });
  };

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
              productNeeds,
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
              <ListGroupItem key={_id}>
                <div style={{ display: 'flex', margin: '30px 0' }}>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    style={{ marginRight: '20px' }}
                    onClick={() => this.onDeleteClick(_id)}
                  >
                    <p style={{ marginBottom: 0 }}>X</p>
                  </Button>
                  <h2 style={{ fontWeight: '600', paddingRight: '30px' }}>{name}</h2>
                </div>
                <ButtonGroup style={{ marginBottom: '30px' }}>
                  <Button
                    color="primary"
                    onClick={() => this.changeAppState(_id, 0)}
                    {... status === 0 ? { active: true } : {}}
                  >
                    Initial Application (Testing)
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.changeAppState(_id, 1)}
                    {... status === 1 ? { active: true } : {}}
                  >
                    Request Interview
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.changeAppState(_id, 2)}
                    {... status === 2 ? { active: true } : {}}
                  >
                    Interview Scheduled
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.changeAppState(_id, 3)}
                    {... status === 3 ? { active: true } : {}}
                  >
                    Review
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.changeAppState(_id, 4)}
                    {... status === 4 ? { active: true } : {}}
                  >
                    Post Decision
                  </Button>
                </ButtonGroup>
                <p style={{ fontWeight: '600' }}><a href={`/p/${urlString}`} target="_blank" rel="noopener noreferrer">View Application Page</a></p>
                <p>
                  <span style={{ fontWeight: '600' }}>Stage: </span>
                  {(() => {
                    switch (status) {
                      case 0:
                        return <span>Submitted</span>;
                      case 1:
                        return <span>Waiting for Interview Schedule</span>;
                      case 2:
                        return <span>Interview Scheduled</span>;
                      case 3:
                        return <span>Reviewing</span>;
                      case 4:
                        return (
                          <span>
                            Decision Reached:
                            {' '}
                            {decision === true ? 'Accepted' : 'Rejected'}
                          </span>
                        );
                      default:
                        return <span>Switch-Case Logic Error</span>;
                    }
                  })()}
                </p>
                <p>
                  <span style={{ fontWeight: '600' }}>Address: </span>
                  {address}
                </p>
                { website && (
                <p>
                  <span style={{ fontWeight: '600' }}>Website: </span>
                  <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                </p>
                )}
                <p>
                  <span style={{ fontWeight: '600' }}>Work Phone: </span>
                  {workPhone}
                </p>
                <p>
                  <span style={{ fontWeight: '600' }}>Contact Name: </span>
                  {contactName}
                </p>
                { mobilePhone && (
                <p>
                  <span style={{ fontWeight: '600' }}>Mobile Phone: </span>
                  {mobilePhone}
                </p>
                )}
                <p>
                  <span style={{ fontWeight: '600' }}>Email: </span>
                  {email}
                </p>
                <p>
                  <span style={{ fontWeight: '600' }}>Mission: </span>
                  {mission}
                </p>
                {(productNeeds.length > 0) && (
                  <>
                    <p style={{ fontWeight: '600' }}>Needs:</p>
                    {productNeeds.map((need) => {
                      if (need === 'Other' && needsOtherExpand) {
                        return <p key={need}>{`- ${need}: ${needsOtherExpand}`}</p>;
                      }

                      return <p key={need}>{`- ${need}`}</p>;
                    })}
                  </>
                )}
                { stageRadio !== 'Other' && (
                <p>
                  <span style={{ fontWeight: '600' }}>Stage of Development: </span>
                  {stageRadio}
                </p>
                )}
                { stageOtherExpand && (
                <p>
                  <span style={{ fontWeight: '600' }}>Stage of Development: </span>
                  {stageOtherExpand}
                </p>
                )}
                <p>
                  <span style={{ fontWeight: '600' }}>Availability: </span>
                  {availRadio}
                </p>
                <p>
                  <span style={{ fontWeight: '600' }}>Field Test? </span>
                  {fieldRadio}
                </p>
                { productExtra && (
                <p>
                  <span style={{ fontWeight: '600' }}>Other Product Needs: </span>
                  {productExtra}
                </p>
                )}
                { feedback && (
                <p>
                  <span style={{ fontWeight: '600' }}>Feedback: </span>
                  {feedback}
                </p>
                )}
                { status >= 3 && (
                <p>
                  <span style={{ fontWeight: '600', marginRight: '15px' }}>Make Decision: </span>
                  <ButtonGroup>
                    <Button
                      onClick={() => this.changeAppDecision(_id, true)}
                      {... decision ? { color: 'success' } : {}}
                    >
                    Accept
                    </Button>
                    <Button
                      onClick={() => this.changeAppDecision(_id, false)}
                      {... decision === false ? { color: 'danger' } : {}}
                    >
                    Decline
                    </Button>
                  </ButtonGroup>
                </p>
                )}
              </ListGroupItem>
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
  addNotification: PropTypes.func.isRequired,
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
  addNotification: addNotificationBase,
})(ApplicationsList);
