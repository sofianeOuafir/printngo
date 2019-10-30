import React from "react";

import TextInput from "./TextInput";

const PartnerSearchBar = ({ onSubmit, onChange, secretCode }) => {
  return (
    <form className="fullwidth flex form__input-container" onSubmit={onSubmit}>
      <TextInput
        className="fullwidth"
        type="text"
        placeholder="Secret Code"
        value={secretCode}
        onChange={onChange}
      />
      <button
        disabled={!secretCode}
        className={`button ${
          secretCode ? "button--navy" : "button--grey"
        } button--no-border-radius`}
      >
        Search
      </button>
    </form>
  );
};

export default PartnerSearchBar;
