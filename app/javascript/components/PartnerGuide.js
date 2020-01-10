import React from "react";
import axios from "axios";

import Loader from "./Loader";
import DocumentShowPage from "./DocumentShowPage";

class PartnerGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    };
  }
  componentDidMount() {
    axios.get("/api/v1/partners/guide").then(response => {
      const { data: url } = response;
      this.setState(() => ({ url, loadingData: false }));
    });
  }
  render() {
    const { loadingData, url } = this.state;
    return loadingData ? <Loader /> : <DocumentShowPage url={url} />;
  }
}

export default PartnerGuide;
