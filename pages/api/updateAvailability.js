import { updateAvailability } from '../../server/mongodb/actions/availabilities';

// @route   GET api/updateAvailability
// @desc    Update the status of an availability
// @access  Public
export default async function (req, res) {
  const { id, isBooked } = req.body;

  await updateAvailability(id, isBooked)
    .then((result) => {
      res.json(result);
    });
}
