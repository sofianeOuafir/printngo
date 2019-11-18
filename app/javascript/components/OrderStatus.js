import React from "react";
import {
  IoIosWarning,
  IoIosCheckmarkCircleOutline,
  IoIosPrint,
  IoMdClock,
  IoMdSync
} from "react-icons/io";

const OrderStatus = ({ printable, onMarkAsPrinted = null }) => {
  if (printable.printed) {
    return (
      <Status
        text="Printed"
        Icon={IoIosCheckmarkCircleOutline}
        color={"text-christmas-tree"}
      />
    );
  } else if (printable.awaiting_confirmation && onMarkAsPrinted) {
    return (
      <button
        onClick={onMarkAsPrinted}
        className="flex align-items--center button button--orange button--no-border-radius my1"
      >
        <IoIosWarning className="h3" /> <span>Mark as printed</span>
      </button>
    );
  } else if (printable.awaiting_confirmation) {
    return <Status text="Printing" Icon={IoIosPrint} color="text-orange" />;
  } else if (printable.preparing) {
    return <Status text="Preparing" Icon={IoMdSync} color={"text-pink"} />;
  } else {
    return <Status text="Ready to Print" Icon={IoMdClock} color="text-navy" />;
  }
};

const Status = ({ text, Icon, color }) => (
  <div className={`status ${color} flex`}>
    <div className="left">
      <Icon className="h3 status--icon" />
    </div>
    <div className="flex flex-direction--column">
      <span className="left">{text}</span>
      {text == "Preparing" && <span className="left">Ready in 1 min</span>}
    </div>
  </div>
);

export default OrderStatus;
