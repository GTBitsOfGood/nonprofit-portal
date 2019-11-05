import { updateAvailability } from '../../server/mongodb/actions/availabilities';

// @route   POST api/updateAvailability
// @desc    Update the status of an availability
// @access  Public
export default async function (req, res) {
  const { id, isBooked, team } = req.body;

  await updateAvailability(id, isBooked, team)
    .then((result) => {
      res.json(result);
    });
}
