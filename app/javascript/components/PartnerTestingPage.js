import React from "react";

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
        <h1 className="h4 text-navy">{t("partnerTestingPage.title")}</h1>
        <div>
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
