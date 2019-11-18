import { updateApplicationDecision } from '../../server/mongodb/actions/applications';

// @route   GET api/updateApplicationDecision
// @desc    Update the decision of an application
// @access  Public
export default async function (req, res) {
  const { id, decision } = req.body;

  return updateApplicationDecision(id, decision)
    .then((result) => res.json(result))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
