import { login } from '../../server/mongodb/actions/users';

// @route   POST api/login
// @desc    Get Login a user
// @access  Public
export default async function (req, res) {
  const { email, password } = req.body;

  await login(email, password)
    .then((token) => res.json({
      success: true,
      token,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.toString(),
    }));
}
