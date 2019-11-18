import { getAvailabilities } from '../../server/mongodb/actions/availabilities';

// @route   GET api/getAvailabilities
// @desc    Get All Availabilities
// @access  Public
export default async function (req, res) {
  return getAvailabilities()
    .then((result) => res.json(result))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
