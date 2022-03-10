import getApplication from "../../../server/apiHandlers/application/getApplication";
import getApplications from "../../../server/apiHandlers/application/getApplications";
import addApplication from "../../../server/apiHandlers/application/addApplication";
import deleteApplication from "../../../server/apiHandlers/application/deleteApplication";
import updateApplicationDecision from "../../../server/apiHandlers/application/updateApplicationDecision";
import updateApplicationMeeting from "../../../server/apiHandlers/application/updateApplicationMeeting";
import updateApplicationState from "../../../server/apiHandlers/application/updateApplicationState";
import { withSessionRoute } from "../../utils/session";

// @route   api/application
// @access  Private
const handler = (req, res) => {
  switch (req.method) {
    case "GET": {
      if (req?.query?.url) {
        return getApplication(req, res);
      } else {
        return getApplications(req, res);
      }
    }
    case "POST": {
      return addApplication(req, res);
    }
    case "DELETE": {
      return deleteApplication(req, res);
    }
    case "PATCH": {
      if (req?.body?.decision) {
        return updateApplicationDecision(req, res);
      }
      if (req?.body?.availabilityId) {
        return updateApplicationMeeting(req, res);
      }
      if (req?.body?.state) {
        return updateApplicationState(req, res);
      }
    }
    default: {
      res.status(400).json({
        success: false,
        message: "Invalid API Request!",
      });
    }
  }
};

export default withSessionRoute(handler);
