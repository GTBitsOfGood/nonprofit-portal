import { getItems } from '../../server/mongodb/actions/items';

// @route   GET api/getItems
// @desc    Get All Items
// @access  Public
export default async function (req, res) {
  await getItems()
    .then((items) => res.json(items));
}
