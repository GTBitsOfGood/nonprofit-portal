import { getApplications } from '../../server/mongodb/actions/applications';

// @route   GET api/getApplications
// @desc    Get All Applications
// @access  Public
export default async function (req, res) {
  return getApplications()
    .then((applications) => res.json(applications))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
