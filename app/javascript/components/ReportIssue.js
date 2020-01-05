import React from "react";
import { withTranslation } from "react-i18next";

const ReportIssue = ({ order, t, tReady, ...rest }) => {
  const subject = t(`reportIssue.subject`, { orderId: order.id });
  return (
    <a {...rest} href={t("reportIssue.href", { subject })}>
      {t("reportIssue.text")}
    </a>
  );
};

export default withTranslation()(ReportIssue);
