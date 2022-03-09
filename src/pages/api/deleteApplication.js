import { deleteApplication } from "../../../server/mongodb/actions/applications";

// @route   DELETE api/deleteApplication
// @desc    Delete An Application
// @access  Public
export default async function (req, res) {
  const { id } = req.body;

  return deleteApplication(id)
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
