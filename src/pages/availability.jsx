import React from "react";
import AdminCalendar from "../components/Availability/AvailabilityCalendar";
import { useUser } from "../actions/users";
import urls from "../utils/urls";

function AvailabilityPage() {
  const { user } = useUser({
    redirectTo: urls.pages.application,
  });

  return <AdminCalendar />;
}

export default AvailabilityPage;
