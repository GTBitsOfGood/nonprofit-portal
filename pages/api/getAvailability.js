import { getAvailability } from '../../server/mongodb/actions/availabilities';

// @route   GET api/getAvailability
// @desc    Get An Availability
// @access  Public
export default async function (req, res) {
  const { id } = req.query;

  await getAvailability(id)
    .then((result) => {
      res.json(result);
    });
}
