import React from "react"

import LoginForm from './LoginForm';
import Layout from './Layout';

class UserLoginPage extends React.Component {
  render () {
    return (
      <Layout>
        <div className="flex fullscreen align-items--center justify-content--center">
          <LoginForm defaultRedirectTo="/" />
        </div>
      </Layout>
    );
  }
}

export default UserLoginPage;

