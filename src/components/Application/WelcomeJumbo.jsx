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
        <dt className="col-sm-3 text-right">April 25, 2022 and beyond</dt>
        <dd className="col-sm-9">
          All new applications will be considered for the Spring 2023 project cycle
        </dd>
      </dl>
    </div>
  </div>
);

export default WelcomeJumbo;
