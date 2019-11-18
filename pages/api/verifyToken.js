import { verifyToken } from '../../server/mongodb/actions/users';

// @route   POST api/verifyToken
// @desc    Get Verify a user token
// @access  Public
export default async function (req, res) {
  const { token } = req.body;

  if (token == null) {
    return res.status(400).json({
      success: false,
      message: 'Client has no cookie!',
    });
  }

  return verifyToken(token)
    .then((user) => res.status(201).json({
      success: true,
      user,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.message,
    }));
}
