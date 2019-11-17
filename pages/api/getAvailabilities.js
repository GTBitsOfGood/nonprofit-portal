import { getAvailabilities } from '../../server/mongodb/actions/availabilities';

// @route   GET api/getAvailabilities
// @desc    Get All Availabilities
// @access  Public
export default async function (req, res) {
  await getAvailabilities()
    .then((result) => res.json(result));
}
