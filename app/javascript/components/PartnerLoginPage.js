import React from "react"

import LoginForm from './LoginForm';
import PartnerLayout from './PartnerLayout';

class UserLoginPage extends React.Component {
  render () {
    return (
      <PartnerLayout>
        <div className="flex fullscreen align-items--center justify-content--center">
          <LoginForm defaultRedirectTo="/partner" />
        </div>
      </PartnerLayout>
    );
  }
}

export default UserLoginPage;

