import ApplicationScreen from "../../screens/ApplicationScreen";
import { getApplication } from "../../../server/mongodb/actions/applications";
import { getAvailability } from "../../../server/mongodb/actions/availabilities";
import { withSessionSsr } from "../../utils/session";

export default ApplicationScreen;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(context) {
    const urlString = context.query.url;
    const application = await getApplication(context.query.url);

    if (application.meeting != null) {
      const meeting = await getAvailability(application.meeting);

      return {
        props: {
          application,
          urlString,
          meeting,
        },
      };
    }

    return {
      props: {
        application,
        urlString,
      },
    };
  }
);
