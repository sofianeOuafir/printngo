import React from "react";

import LoginForm from "./LoginForm";

class AdminLoginPage extends React.Component {
  render() {
    return (
      <div className="flex fullscreen align-items--center justify-content--center">
        <LoginForm defaultRedirectTo="/admin" />
      </div>
    );
  }
}

export default AdminLoginPage;
