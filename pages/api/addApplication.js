import { addApplication } from '../../server/mongodb/actions/applications';

// @route   POST api/addApplication
// @desc    Create An Application
// @access  Public
export default async function (req, res) {
  const { application } = req.body;

  return addApplication(application)
    .then((result) => res.status(201).json({
      success: true,
      payload: result,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error,
    }));
}
