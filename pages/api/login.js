import { login } from '../../server/mongodb/actions/users';

// @route   POST api/login
// @desc    Get Login a user
// @access  Public
export default async function (req, res) {
  const { email, password } = req.body;

  return login(email, password)
    .then((token) => {
      res.setHeader('Set-Cookie', `token=${token}; Max-Age=604800; SameSite=Lax; Path=/`);

      return res.status(200).json({
        success: true,
        token,
      });
    })
    .catch((error) => res.status(400).json({
      success: false,
      message: error.toString(),
    }));
}
