import React from "react";

import LoginForm from "./LoginForm";

class UserLoginPage extends React.Component {
  render() {
    return (
      <div className="flex fullscreen align-items--center justify-content--center">
        <LoginForm defaultRedirectTo="/" />
      </div>
    );
  }
}

export default UserLoginPage;
