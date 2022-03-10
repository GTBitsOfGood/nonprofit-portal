import { getAvailability } from "../../mongodb/actions/availabilities";

// @route   POST api/getAvailability
// @desc    Get An Availability
// @access  Public
export default async function (req, res) {
  const { id } = req.query;

  return getAvailability(id)
    .then((result) =>
      res.status(200).json({
        success: true,
        payload: result,
      })
    )
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );
}
