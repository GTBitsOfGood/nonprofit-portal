import { updateAvailability } from '../../server/mongodb/actions/availabilities';

// @route   POST api/updateAvailability
// @desc    Update the status of an availability
// @access  Public
export default async function (req, res) {
  const { id, updatedFields } = req.body;

  return updateAvailability(id, updatedFields)
    .then((result) => res.json(result))
    .catch((error) => res.json({
      success: false,
      message: error.message,
    }));
}
