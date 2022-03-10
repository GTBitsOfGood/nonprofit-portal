import React from "react";
import Image from "next/image";
import BogLogo from "../../../public/static/bog_logo.svg";

const WelcomeJumbo = () => (
  <div>
    <div style={{ background: "transparent" }} className="Jumbotron">
      <div className="bogLogo">
        <Image src={BogLogo} alt="Bits of Good" width={230} height={50} />
      </div>
      <h4 align="center">Nonprofit Application</h4>
      <p className="lead" align="center">
        As a partner, Bits of Good will help you build software that turns your
        need into real product. Please fill out the following form so that we
        can best understand your mission and need!
      </p>
      <p align="center" className="lead">
        <strong>Application Timelines:</strong>
      </p>
      <dl
        className="row w-75"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <dt className="col-sm-3 text-right">January 25, 2022 and beyond</dt>
        <dd className="col-sm-9">
          Expect to hear back from us within a week to set up a follow-up
          meeting and you will be considered for the Fall 2022 project cycle.
        </dd>
      </dl>
    </div>
  </div>
);

export default WelcomeJumbo;