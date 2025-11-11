import React from "react";
import Image from "next/image";
import BogLogo from "../../../public/static/bog_logo.svg";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function ordinal(n) {
  const s = ["th","st","nd","rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function formatDate(d) {
  return `${monthNames[d.getMonth()]} ${ordinal(d.getDate())}, ${d.getFullYear()}`;
}

/**
 * Cycles:
 * - Applications before Jan 1 -> Spring of that year
 * - Applications before Aug 1 -> Fall of that year
 * - After Aug 1 -> next cutoff is Jan 1 of next year -> Spring of next year
 */
function getCycleInfo(now = new Date()) {
  const year = now.getFullYear();
  const jan1 = new Date(year, 0, 1);   // Jan 1, 00:00 local
  const aug1 = new Date(year, 7, 1);   // Aug 1, 00:00 local

  // Before Jan 1 of this year (i.e., late previous year)
  if (now < jan1) {
    const prevYear = year - 1;
    const prevAug1 = new Date(prevYear, 7, 1);
    return {
      lastCycleCutoff: formatDate(prevAug1),
      thisCycleCutoff: formatDate(jan1),
      nextCycleSeason: "Spring",
      nextCycleYear: year,
    };
  }

  // Jan 1 up to (but not including) Aug 1 -> Fall of the same year
  if (now < aug1) {
    return {
      lastCycleCutoff: formatDate(jan1),
      thisCycleCutoff: formatDate(aug1),
      nextCycleSeason: "Fall",
      nextCycleYear: year,
    };
  }

  // Aug 1 or later -> next cutoff is Jan 1 of next year -> Spring next year
  const nextYear = year + 1;
  const nextJan1 = new Date(nextYear, 0, 1);
  return {
    lastCycleCutoff: formatDate(aug1),
    thisCycleCutoff: formatDate(nextJan1),
    nextCycleSeason: "Spring",
    nextCycleYear: nextYear,
  };
}

const WelcomeJumbo = () => {
  const { lastCycleCutoff, thisCycleCutoff, nextCycleSeason, nextCycleYear } = getCycleInfo();

  return (
    <div>
      <div style={{ background: "transparent" }} className="Jumbotron">
        <div className="bogLogo">
          <Image src={BogLogo} alt="Bits of Good" width={230} height={50} />
        </div>

        <h4 style={{ textAlign: "center" }}>Nonprofit Application</h4>
        <p className="lead" style={{ textAlign: "center" }}>
          As a partner, Bits of Good will help you build software that turns your
          need into real product. Please fill out the following form so that we
          can best understand your mission and need!
        </p>

        <p style={{ textAlign: "center" }} className="lead">
          <strong>Application Timelines:</strong>
        </p>

        <dl
          className="row w-75"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <dt className="col-sm-3 text-right">{lastCycleCutoff} and beyond</dt>
          <dd className="col-sm-9">
            All new applications before {thisCycleCutoff} will be considered for the{" "}
            {nextCycleSeason} {nextCycleYear} project cycle.
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default WelcomeJumbo;
