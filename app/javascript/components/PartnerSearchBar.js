import React from "react";
import { withTranslation } from "react-i18next";

import TextInput from "./TextInput";

const PartnerSearchBar = ({ onSubmit, onChange, secretCode, t }) => {
  return (
    <form className="flex form__input-container" onSubmit={onSubmit}>
      <div className="col-8">
        <TextInput
          type="text"
          placeholder={t("partnerSearchBar.accessCode")}
          value={secretCode}
          onChange={onChange}
        />
      </div>
      <div className="col-4">
        <button
          disabled={!secretCode}
          className={`button fullheight fullwidth ${
            secretCode ? "button--navy" : "button--grey"
          } button--no-border-radius`}
        >
          {t("partnerSearchBar.search")}
        </button>
      </div>
    </form>
  );
};

export default withTranslation()(PartnerSearchBar);
