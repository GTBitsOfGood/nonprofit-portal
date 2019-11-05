import { updateApplicationDecision } from '../../server/mongodb/actions/applications';

// @route   GET api/updateApplicationDecision
// @desc    Update the decision of an application
// @access  Public
export default async function (req, res) {
  const { id, decision } = req.body;

  await updateApplicationDecision(id, decision)
    .then((result) => {
      res.json(result);
    });
}
