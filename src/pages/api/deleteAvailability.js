import { deleteAvailability } from "../../../server/mongodb/actions/availabilities";

// @route   DELETE api/deleteAvailability
// @desc    Delete An Availability
// @access  Public
export default async function (req, res) {
  const { id } = req.body;

  return deleteAvailability(id)
    .then(() =>
      res.status(200).json({
        success: true,
      })
    )
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );
}
