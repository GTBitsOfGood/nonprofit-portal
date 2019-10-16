import { getApplication } from '../../server/mongodb/actions/applications';

// @route   GET api/getApplication
// @desc    Get An Application
// @access  Public
export default async function (req, res) {
  const urlString = req.query.url;
  await getApplication(urlString)
    .then((result) => {
      res.json(result);
    });
}
