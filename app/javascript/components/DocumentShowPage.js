import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import throttle from "lodash.throttle";

import Loader from "./Loader";
import DocumentViewer from "./DocumentViewer";

class DocumentShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      loadingData: true,
      width: null
    };
  }
  componentWillUnmount() {
    window.removeEventListener("resize", throttle(this.setDivSize, 500));
  }

  setDivSize = () => {
    this.setState({ width: this.pdfWrapper.getBoundingClientRect().width });
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`/api/v1/documents/${id}`).then(response => {
      this.setState(() => ({
        url: response.data.url,
        loadingData: false
      }));
      this.setDivSize();
      window.addEventListener("resize", throttle(this.setDivSize, 500));
    });
  }
  render() {
    const { url, loadingData } = this.state;

    return loadingData ? (
      <Loader />
    ) : (
      <div
        id="row"
        style={{
          height: "100vh",
          width: "100vw"
        }}
      >
        <div className="content-container">
          <Link
            to="#"
            onClick={e => {
              e.preventDefault();
              this.props.history.goBack();
            }}
            className="button button--navy my1"
          >
            &larr; Back
          </Link>
          <div
            id="pdfWrapper"
            style={{ width: "100%" }}
            ref={ref => (this.pdfWrapper = ref)}
          >
            <DocumentViewer file={url} wrapperDivSize={this.state.width} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DocumentShowPage);
