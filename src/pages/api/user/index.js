import { getUserFromId } from "../../../../server/mongodb/actions/users";
import { withSessionRoute } from "../../../utils/session";

// @route   GET api/user
// @desc    Get current user from cookie
// @access  Public
const handler = async (req, res) => {
  if (!req.session.user) {
    return res.status(200).json({
      success: true,
      payload: {
        isLoggedIn: false,
      },
    });
  }

  try {
    const id = req.session?.user?.id;
    const user = await getUserFromId(id);

    return res.status(200).json({
      success: true,
      payload: {
        ...user,
        isLoggedIn: true,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
