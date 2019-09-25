import { addItem } from '../../server/mongodb/actions/items';

// @route   POST api/addItem
// @desc    Create An Item
// @access  Public
export default async function (req, res) {
  const { body } = req;

  await addItem(body)
    .then((item) => res.json(item));
}
