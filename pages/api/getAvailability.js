import { getAvailability } from '../../server/mongodb/actions/availabilities';

// @route   POST api/getAvailability
// @desc    Get An Availability
// @access  Public
export default async function (req, res) {
  const { id } = req.body;

  return getAvailability(id)
    .then((result) => res.json(result))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
