import { addApplication } from '../../server/mongodb/actions/applications';

// @route   POST api/addApplication
// @desc    Create An Application
// @access  Public
export default async function (req, res) {
  const { application } = req.body;

  await addApplication(application)
    .then((result) => res.json(result));
}
