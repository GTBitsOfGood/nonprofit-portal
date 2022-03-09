import getAvailability from "../../../server/apiHandlers/availability/getAvailability";
import getAvailabilities from "../../../server/apiHandlers/availability/getAvailabilities";
import addAvailability from "../../../server/apiHandlers/availability/addAvailability";
import deleteAvailability from "../../../server/apiHandlers/availability/deleteAvailability";
import updateAvailability from "../../../server/apiHandlers/availability/updateAvailability";

// @route   POST api/application
// @access  Private
export default async function (req, res) {
  switch (req.method) {
    case "GET": {
      if (req?.query?.id) {
        return getAvailability(req, res);
      } else {
        return getAvailabilities(req, res);
      }
    }
    case "POST": {
      return addAvailability(req, res);
    }
    case "PUT": {
      return updateAvailability(req, res);
    }
    case "DELETE": {
      return deleteAvailability(req, res);
    }
    default: {
      res.status(400).json({
        success: false,
        message: "Invalid API Request!",
      });
    }
  }
}
