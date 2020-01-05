import React from "react";

const AdminHomePage = ({ t }) => {
  return (
    <div className="content-container">
      <h1 className="text-navy h4">{t("adminHomePage.title")}</h1>
    </div>
  );
};

export default AdminHomePage;
