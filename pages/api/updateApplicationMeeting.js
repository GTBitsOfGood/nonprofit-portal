import { updateApplicationMeeting } from '../../server/mongodb/actions/applications';

// @route   POST api/updateApplicationDecision
// @desc    Update the decision of an application
// @access  Public
export default async function (req, res) {
  const { id, availabilityId } = req.body;

  await updateApplicationMeeting(id, availabilityId)
    .then((result) => {
      res.json(result);
    });
}
