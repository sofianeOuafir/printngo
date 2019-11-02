import React from "react";
import { IoIosPrint } from "react-icons/io";

const ReadyToPrintElement = () => (
  <div className="text-orange flex align-items--center">
    <div>
      <IoIosPrint className="h3" />
    </div>
    <div>
      <span>Printing</span>
    </div>
  </div>
);

export default ReadyToPrintElement;
