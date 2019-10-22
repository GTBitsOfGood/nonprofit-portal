import { getApplications } from '../../server/mongodb/actions/applications';

// @route   GET api/getApplications
// @desc    Get All Applications
// @access  Public
export default async function (req, res) {
  await getApplications()
    .then((applications) => res.json(applications));
}
