import React from "react";
import App from "./App";
import { withTranslation } from "react-i18next";

const AppWithTranslation = props => <App {...props} />;

export default withTranslation()(AppWithTranslation);
