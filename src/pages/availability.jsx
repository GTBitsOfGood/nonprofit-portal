import React from "react";
import cookie from "js-cookie";
import Router from "next/router";
import AdminCalendar from "../components/Availability/AvailabilityCalendar";
import { verifyToken } from "../actions/users";
import config from "../../config";

class IndexPage extends React.PureComponent {
  static async getInitialProps(ctx) {
    // eslint-disable-next-line global-require
    const token = ctx.res
      ? require("next-cookies")(ctx).token
      : cookie.get("token");

    return verifyToken(token, ctx.res)
      .then((user) => user)
      .catch(async () => {
        if (ctx.res) {
          ctx.res.writeHead(302, {
            Location: config.pages.application,
          });
          ctx.res.end();
        } else {
          await Router.push(config.pages.application);
        }
      });
  }

  render() {
    return <AdminCalendar />;
  }
}

export default IndexPage;
