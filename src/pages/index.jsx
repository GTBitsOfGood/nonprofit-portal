import React from "react";
import { Container } from "reactstrap";
import WelcomeJumbo from "../components/Application/WelcomeJumbo";
import ApplicationForm from "../components/Application/ApplicationForm";

function IndexPage() {
  return (
    <Container>
      <WelcomeJumbo />
      <ApplicationForm />
    </Container>
  );
}

export default IndexPage;
