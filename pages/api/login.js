import { login } from '../../server/mongodb/actions/users';

// @route   POST api/login
// @desc    Get Login a user
// @access  Public
export default async function (req, res) {
  const { email, password } = req.body;

  await login(email, password)
    .then((user) => res.json({
      success: true,
      id: user._id,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.toString(),
    }));
}
