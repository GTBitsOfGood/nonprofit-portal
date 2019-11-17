import { addAvailability } from '../../server/mongodb/actions/availabilities';

// @route   POST api/addAvailability
// @desc    Create An Availability
// @access  Public
export default async function (req, res) {
  const { availability } = req.body;

  await addAvailability(availability)
    .then((result) => res.json(result));
}
