import React from "react";

import LoginForm from "./LoginForm";

class PartnerLoginPage extends React.Component {
  render() {
    return (
      <div className="flex fullscreen align-items--center justify-content--center">
        <LoginForm defaultRedirectTo="/partner" />
      </div>
    );
  }
}

export default PartnerLoginPage;
