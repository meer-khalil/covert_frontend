import React from "react";
import Calendly from "./Calendly";
import BackButton from "../Common/BackButton";

const SchedualMeeting = () => {
  return (
    <>
      <div className=" max-w-[1080px] mx-auto mt-10">
        <BackButton />
      </div>
      <Calendly />
    </>
  );
};

export default SchedualMeeting;
