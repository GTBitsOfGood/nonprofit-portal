import { getApplications } from '../../server/mongodb/actions/applications';

// @route   GET api/getApplications
// @desc    Get All Applications
// @access  Public
export default async function (req, res) {
  return getApplications()
    .then((applications) => res.status(200).json(applications))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
