import React from "react";
import PageBanner from "./PageBanner";

class PartnerTestingPage extends React.Component {
  onTestPrintingNow = e => {
    e.preventDefault();
    const id = `testingFile`;
    window.frames[id].focus();
    window.frames[id].print();
  };
  render() {
    const { t } = this.props;
    return (
      <div className="content-container">
        <PageBanner
          title={t("partnerTestingPage.title")}
          description={t("partnerTestingPage.description")}
        />
        <div className="center">
          <button
            className="button button--navy"
            onClick={this.onTestPrintingNow}
          >
            {t("partnerTestingPage.testPrintingNow")}
          </button>
        </div>
        <iframe
          className="hide"
          id={`testingFile`}
          src={`/api/v1/partners/testing`}
          name={`testingFile`}
        ></iframe>
      </div>
    );
  }
}

export default PartnerTestingPage;
