import { signUp } from '../../server/mongodb/actions/users';

// @route   POST api/signUp
// @desc    Get Sign up a user
// @access  Public
export default async function (req, res) {
  const { name, email, password } = req.body;

  await signUp(name, email, password)
    .then((user) => res.status(201).json({
      success: true,
      id: user._id,
    }))
    .catch((error) => res.status(400).json({
      success: false,
      message: error.toString(),
    }));
}
