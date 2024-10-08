import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import React from "react";

class ScrollToTop extends React.Component {
  componentDidMount() {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      ReactGA.pageview(window.location.pathname + window.location.search);
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
