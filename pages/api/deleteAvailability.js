import { deleteAvailability } from '../../server/mongodb/actions/availabilities';

// @route   DELETE api/deleteAvailability
// @desc    Delete An Availability
// @access  Public
export default async function (req, res) {
  const { id } = req.body;

  await deleteAvailability(id)
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }));
}
