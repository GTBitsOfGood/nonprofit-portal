import { addItem } from '../../server/mongodb/actions/items';

// @route   POST api/addItem
// @desc    Create An Item
// @access  Public
export default async function (req, res) {
  const { item } = req.body;

  await addItem(item)
    .then((result) => res.json(result));
}
