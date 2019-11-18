import { updateApplicationMeeting } from '../../server/mongodb/actions/applications';

// @route   POST api/updateApplicationDecision
// @desc    Update the decision of an application
// @access  Public
export default async function (req, res) {
  const { id, availabilityId } = req.body;

  return updateApplicationMeeting(id, availabilityId)
    .then((result) => res.json(result))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
