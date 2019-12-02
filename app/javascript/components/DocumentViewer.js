import React, { Component, Fragment } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Loader from "./Loader";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class DocumentViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset
    }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { pageNumber, numPages } = this.state;
    const Nav = () => {
      return (
        <div
          className={`flex justify-content--between mb1 sticky bg-white pb1`}
        >
          <button
            className={`button ${
              pageNumber <= 1 ? "button--grey" : "button--pink"
            }`}
            disabled={pageNumber <= 1}
            onClick={this.previousPage}
          >
            &larr; Previous
          </button>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button
            className={`button ${
              pageNumber >= numPages ? "button--grey" : "button--pink"
            }`}
            disabled={pageNumber >= numPages}
            onClick={this.nextPage}
          >
            Next &rarr;
          </button>
        </div>
      );
    };
    return (
      <Fragment>
        {numPages > 1 && <Nav />}
        <Document
          file={this.props.file}
          loading={<Loader />}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page
            loading={<Loader />}
            pageNumber={pageNumber}
            width={this.props.wrapperDivSize}
          />
        </Document>
      </Fragment>
    );
  }
}

export default DocumentViewer;
