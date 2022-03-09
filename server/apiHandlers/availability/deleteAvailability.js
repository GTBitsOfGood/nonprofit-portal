import { deleteAvailability } from "../../mongodb/actions/availabilities";

// @route   DELETE api/deleteAvailability
// @desc    Delete An Availability
// @access  Public
export default async function (req, res) {
  const { id } = req.body;
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

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
