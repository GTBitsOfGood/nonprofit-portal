import { login } from "../../../../server/mongodb/actions/users";
import { withSessionRoute } from "../../../utils/session";

// @route   POST api/user/login
// @desc    Login Request
// @access  Public
const handler = async (req, res) => {
  try {
    const user = await login(req.body.email, req.body.password);

    req.session.user = {
      ...user,
      isLoggedIn: true,
    };
    await req.session.save();

    return res.status(200).json({
      success: true,
      payload: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
