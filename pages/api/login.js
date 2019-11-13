import { login } from '../../server/mongodb/actions/users';

// @route   GET api/login
// @desc    Get Login a user
// @access  Public
export default async function (req, res) {
  const { username, password } = req.body;

  await login(username, password)
    .then((user) => {
      req.session.userId = user._id;

      return res.json({
        status: 'ok',
        message: `Welcome back, ${user.name}!`,
      });
    })
    .catch((error) => res.status(400).json({
      status: 'error',
      message: error.toString(),
    }));
}
