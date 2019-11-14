import { withSession } from 'next-session';
import { login } from '../../server/mongodb/actions/users';

// @route   POST api/login
// @desc    Get Login a user
// @access  Public
async function handler(req, res) {
  const { username, password } = req.body;

  await login(username, password)
    .then((user) => {
      req.session.userId = user._id;
      req.session.username = user.username;

      return res.json({
        success: true,
        message: `Welcome back, ${user.username}!`,
      });
    })
    .catch((error) => res.status(400).json({
      success: false,
      message: error.toString(),
    }));
}

export default withSession(handler);
