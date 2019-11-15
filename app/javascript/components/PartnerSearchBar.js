import React from "react";

import TextInput from "./TextInput";

const PartnerSearchBar = ({ onSubmit, onChange, secretCode }) => {
  return (
    <form className="flex form__input-container" onSubmit={onSubmit}>
      <div className="col-8">
        <TextInput
          type="text"
          placeholder="Secret Code"
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
          Search
        </button>
      </div>
    </form>
  );
};

export default PartnerSearchBar;
