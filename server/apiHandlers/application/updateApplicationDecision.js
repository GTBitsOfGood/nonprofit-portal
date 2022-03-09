import { updateApplicationDecision } from "../../mongodb/actions/applications";

// @route   GET api/updateApplicationDecision
// @desc    Update the decision of an application
// @access  Public
export default async function (req, res) {
  const { id, decision } = req.body;

  return updateApplicationDecision(id, decision)
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
