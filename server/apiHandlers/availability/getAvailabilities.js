import { getAvailabilities } from "../../mongodb/actions/availabilities";

// @route   GET api/getAvailabilities
// @desc    Get All Availabilities
// @access  Public
export default async function (req, res) {
  return getAvailabilities()
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
