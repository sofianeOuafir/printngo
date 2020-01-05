import React from "react";
import {
  IoIosWarning,
  IoIosCheckmarkCircleOutline,
  IoIosPrint,
  IoMdClock,
  IoMdSync
} from "react-icons/io";
import { withTranslation } from "react-i18next";

const OrderStatus = ({ printable, onMarkAsPrinted = null, t }) => {
  if (printable.printed) {
    return (
      <Status
        text={t("orderStatus.printed")}
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
        <IoIosWarning className="h3" />{" "}
        <span>{t("orderStatus.markAsPrinted")}</span>
      </button>
    );
  } else if (printable.awaiting_confirmation) {
    return (
      <Status
        text={t("orderStatus.printing")}
        Icon={IoIosPrint}
        color="text-orange"
      />
    );
  } else if (printable.preparing) {
    return <Status text={t("orderStatus.preparing")} Icon={IoMdSync} color={"text-pink"} />;
  } else {
    return <Status text={t("orderStatus.readyToPrint")} Icon={IoMdClock} color="text-navy" />;
  }
};

const Status = ({ text, Icon, color }) => (
  <div className={`status ${color} flex`}>
    <div className="left">
      <Icon className="h3 status--icon" />
    </div>
    <div className="flex flex-direction--column">
      <span className="left">{text}</span>
    </div>
  </div>
);

export default withTranslation()(OrderStatus);
