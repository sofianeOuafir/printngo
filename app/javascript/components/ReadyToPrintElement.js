import React from "react";
import { IoMdClock } from "react-icons/io";

const ReadyToPrintElement = () => (
  <div className="text-navy flex align-items--center">
    <div>
      <IoMdClock className="h3" />
    </div>
    <div>
      <span>Ready to print</span>
    </div>
  </div>
);

export default ReadyToPrintElement;
