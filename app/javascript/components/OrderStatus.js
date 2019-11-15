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
      <div className="text-christmas-tree flex align-items--center">
        <div>
          <IoIosCheckmarkCircleOutline className="h3" />
        </div>
        <div>
          <span>Printed</span>
        </div>
      </div>
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
    return (
      <div className="text-orange flex align-items--center">
        <div>
          <IoIosPrint className="h3" />
        </div>
        <div>
          <span>Printing</span>
        </div>
      </div>
    );
  } else if (printable.preparing) {
    return (
      <div className="text-pink flex align-items--center">
        <div>
          <IoMdSync className="h3" />
        </div>
        <div className="flex flex-direction--column">
          <span>Preparing</span>
          <span className="h6">(Should be ready shortly)</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-navy flex align-items--center">
        <div>
          <IoMdClock className="h3" />
        </div>
        <div>
          <span>Ready to print</span>
        </div>
      </div>
    );
  }
};

export default OrderStatus;
