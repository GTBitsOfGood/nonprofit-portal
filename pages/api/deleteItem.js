import { deleteItem } from '../../server/mongodb/actions/items';

// @route   DELETE api/deleteItem
// @desc    Delete An Item
// @access  Public
export default async function (req, res) {
  const { id } = req.body;

  await deleteItem(id)
    .then(() => res.json({ success: true }));
}
