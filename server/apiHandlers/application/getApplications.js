import { getApplications } from "../../mongodb/actions/applications";

// @route   GET api/getApplications
// @desc    Get All Applications
// @access  Public
export default async function (req, res) {
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

  return getApplications()
    .then((applications) =>
      res.status(200).json({
        success: true,
        payload: applications,
      })
    )
    .catch((error) =>
      res.status(400).json({
        success: false,
        message: error.message,
      })
    );
}
