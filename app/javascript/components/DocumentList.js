import React from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import DocumentItem from "./DocumentItem";

const DocumentList = ({ documents, t }) => {
  return documents.length ? (
    documents.map((document, index) => (
      <DocumentItem key={index} document={document} />
    ))
  ) : (
    <p className="h5">{t("documentList.noDocumentYet")}</p>
  );
};

const mapStateToProps = state => ({
  documents: state.documents
});

export default connect(mapStateToProps)(withTranslation()(DocumentList));
