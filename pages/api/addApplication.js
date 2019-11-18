import { addApplication } from '../../server/mongodb/actions/applications';

// @route   POST api/addApplication
// @desc    Create An Application
// @access  Public
export default async function (req, res) {
  const { application } = req.body;

  return addApplication(application)
    .then((result) => res.json(result))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
