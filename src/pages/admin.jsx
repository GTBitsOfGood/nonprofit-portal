import React from "react";
import ApplicationsList from "../components/Admin/ApplicationsList";
import urls from "../utils/urls";
import { useUser } from "../actions/users";

function AdminPage() {
  const { user } = useUser({
    redirectTo: urls.pages.application,
  });

  return <ApplicationsList />;
}

export default AdminPage;
