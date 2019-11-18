import { addAvailability } from '../../server/mongodb/actions/availabilities';

// @route   POST api/addAvailability
// @desc    Create An Availability
// @access  Public
export default async function (req, res) {
  const { availability } = req.body;

  return addAvailability(availability)
    .then((result) => res.json(result))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
