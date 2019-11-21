import React from 'react';
import { connect } from 'react-redux';
import DocumentItem from './DocumentItem';

const DocumentList = ({ documents }) => {
  return (
    documents.length ? documents.map((document, index) => 
      (
       <DocumentItem key={index} document={document} />
   )) : (
       <p className="h5">You don't have any document yet.</p>
   ) 
  )

}

const mapStateToProps = (state) => ({
  documents: state.documents
})

export default connect(mapStateToProps)(DocumentList)