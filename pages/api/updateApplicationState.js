import { updateApplicationState } from '../../server/mongodb/actions/applications';

// @route   GET api/updateApplicationState
// @desc    Update the status of an application
// @access  Public
export default async function (req, res) {
  const { id, state } = req.body;

  return updateApplicationState(id, state)
    .then((result) => res.json(result))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
