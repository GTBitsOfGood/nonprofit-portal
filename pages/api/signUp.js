import { withSession } from 'next-session';
import { signUp } from '../../server/mongodb/actions/users';

// @route   GET api/signUp
// @desc    Get Sign up a user
// @access  Public
async function handler(req, res) {
  const { username, password } = req.body;

  await signUp(username, password)
    .then((user) => {
      req.session.userId = user._id;

      res.status(201).json({
        status: 'ok',
        message: 'User signed up successfully',
      });
    })
    .catch((error) => res.status(400).json({
      status: 'error',
      message: error.toString(),
    }));
}

export default withSession(handler);
