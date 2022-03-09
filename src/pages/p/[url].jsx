import ApplicationScreen from "../../screens/ApplicationScreen";

export async function getServerSideProps(context) {
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

export default ApplicationScreen;
