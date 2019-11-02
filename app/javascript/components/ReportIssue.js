import React from "react";

const ReportIssue = ({ order, ...rest }) => {
  const subject = `Issue with order #${order.id}`;
  return <a {...rest} href={`mailto:issue@printngo.ca?subject=${subject}`}>Report an issue</a>;
};

export default ReportIssue;
