import { updateApplicationMeeting } from "../../../../server/mongodb/actions/applications";

// @route   POST api/updateApplicationDecision
// @desc    Update the decision of an application
// @access  Public
export default async function (req, res) {
  const { id, availabilityId } = req.body;

  return updateApplicationMeeting(id, availabilityId)
    .then((result) =>
      res.status(200).json({
        success: true,
        payload: result,
      })
    )
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );
}
