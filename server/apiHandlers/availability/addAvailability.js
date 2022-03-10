import { addAvailability } from "../../mongodb/actions/availabilities";

// @route   POST api/addAvailability
// @desc    Create An Availability
// @access  Public
export default async function (req, res) {
  const { availability } = req.body;
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

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
