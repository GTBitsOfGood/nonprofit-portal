import { getItem } from '../../server/mongodb/actions/items';

// @route   GET api/getItem
// @desc    Get An Item
// @access  Public
export default async function (req, res) {
  const urlString = req.query.url;
  await getItem(urlString)
    .then((result) => {
      res.json(result);
    });
}
