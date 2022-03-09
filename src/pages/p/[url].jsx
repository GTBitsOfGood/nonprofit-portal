import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import StatusJumbo from "../../components/Landing/StatusJumbo";
import StatusBar from "../../components/Landing/StatusBar";
import LandingBody from "../../components/Landing/LandingBody";
import { getApplication } from "../../actions/applications";
import { getAvailability } from "../../actions/availabilities";

function LandingPage({ application, meeting }) {
  return (
    <Container>
      <StatusJumbo
        status={application.status}
        name={application.name}
        decision={application.decision}
      />
      <StatusBar status={application.status} />
      <LandingBody
        status={application.status}
        name={application.name}
        decision={application.decision}
        applicationId={application._id}
        meeting={meeting}
      />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const urlString = context.query.url;
  const application = await getApplication(context.query.url);

  if (application.meeting != null) {
    const meeting = await getAvailability(application.meeting);

    return {
      props: {
        application,
        urlString,
        meeting,
      },
    };
  }

  return {
    props: {
      application,
      urlString,
    },
  };
}

LandingPage.propTypes = {
  application: PropTypes.shape({
    _id: PropTypes.string,
    address: PropTypes.string,
    availRadio: PropTypes.string,
    contactName: PropTypes.string,
    decision: PropTypes.bool,
    email: PropTypes.string,
    feedback: PropTypes.string,
    fieldRadio: PropTypes.string,
    mission: PropTypes.string,
    mobilePhone: PropTypes.string,
    name: PropTypes.string,
    needsWeb: PropTypes.string,
    productExtra: PropTypes.string,
    stageRadio: PropTypes.string,
    status: PropTypes.number,
    urlString: PropTypes.string,
    website: PropTypes.string,
    workPhone: PropTypes.string,
  }).isRequired,
  meeting: PropTypes.shape({
    _id: PropTypes.string,
    isBooked: PropTypes.bool,
    team: PropTypes.string,
    startDate: PropTypes.string,
  }),
};

LandingPage.defaultProps = {
  meeting: null,
};

export default LandingPage;
