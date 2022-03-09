import { addAvailability } from "../../../../server/mongodb/actions/availabilities";

// @route   POST api/addAvailability
// @desc    Create An Availability
// @access  Public
export default async function (req, res) {
  const { availability } = req.body;

  return addAvailability(availability)
    .then((result) =>
      res.status(201).json({
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
