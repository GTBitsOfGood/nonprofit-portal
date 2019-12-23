import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  updateApplicationState as updateApplicationStateBase,
  updateApplicationDecision as updateApplicationDecisionBase,
} from '../../redux/actions/applicationActions';
import {
  addNotification as addNotificationBase,
} from '../../redux/actions/notificationActions';
import './Application.css';

const stageButtons = ['Initial Application', 'Request Interview', 'Interview Scheduled',
  'Review', 'Post Decision'];

const statusNames = ['Submitted', 'Waiting for Interview Schedule', 'Interview Scheduled',
  'Reviewing', 'Decision Reached: Rejected', 'Decision Reached: Accepted'];

class Application extends React.PureComponent {
  onDeleteClick = async () => {
    const { deleteHandler, info } = this.props;

    const { _id } = info;

    // eslint-disable-next-line no-alert
    const confirm = window.confirm('Are you sure you want to delete this application?');

    if (confirm === true) {
      await deleteHandler(_id);
    }
  };

  changeAppState = async (state) => {
    const { info, updateApplicationState, addNotification } = this.props;

    const { _id } = info;

    await updateApplicationState(_id, state)
      .then(async () => {
        await addNotification({
          header: 'Successfully changed application state!',
          type: 'success',
        });
      })
      .catch(async () => {
        await addNotification({
          header: 'Failed to change application state!',
          body: 'Please refresh and try again.',
          type: 'error',
          persist: true,
        });
      });
  };

  changeAppDecision = async (decision) => {
    const { info, updateApplicationDecision, addNotification } = this.props;

    const { _id } = info;

    await updateApplicationDecision(_id, decision)
      .then(async () => {
        await addNotification({
          header: 'Successfully changed application decision!',
          type: 'success',
        });
      })
      .catch(async () => {
        await addNotification({
          header: 'Failed to change application decision!',
          body: 'Please refresh and try again.',
          type: 'error',
          persist: true,
        });
      });
  };

  render() {
    const { info } = this.props;

    if (info == null) {
      return null;
    }

    const {
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
    } = info;

    console.log('info', info)

    return (
      <div className="applicationWrapper">
        <div className="nameHeader">
          <h3>{name}</h3>
          <Button
            className="remove-btn"
            color="danger"
            size="sm"
            onClick={this.onDeleteClick}
          >
            <FontAwesomeIcon
              icon={faTimes}
              color="white"
              size="2x"
            />
            <h4>Delete</h4>
          </Button>
        </div>
        <div className="applicationContent">
          <ButtonGroup style={{ marginBottom: '30px' }}>
            {stageButtons.map((buttonName, stageIndex) => (
              <Button
                key={buttonName}
                color="primary"
                onClick={() => this.changeAppState(stageIndex)}
                {... status === stageIndex ? { active: true } : {}}
              >
                {buttonName}
              </Button>
            ))}
          </ButtonGroup>
          <p style={{ fontWeight: '600' }}>
            <a href={`/p/${urlString}`} target="_blank" rel="noopener noreferrer">View Application Page</a>
          </p>
          <p>
            <span style={{ fontWeight: '600' }}>Stage: </span>
            <span>{statusNames[status + ((status === 4 && decision === true) ? 1 : 0)]}</span>
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
                  onClick={() => this.changeAppDecision(true)}
                  {... decision ? { color: 'success' } : {}}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => this.changeAppDecision(false)}
                  {... decision === false ? { color: 'danger' } : {}}
                >
                  Decline
                </Button>
              </ButtonGroup>
            </p>
          )}
        </div>
      </div>
    );
  }
}

Application.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
  updateApplicationState: PropTypes.func.isRequired,
  updateApplicationDecision: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  info: PropTypes.object.isRequired,
};

export default connect(null, {
  updateApplicationState: updateApplicationStateBase,
  updateApplicationDecision: updateApplicationDecisionBase,
  addNotification: addNotificationBase,
})(Application);
