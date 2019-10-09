import React from "react"
import { connect } from 'react-redux';

import Layout from './Layout';
import { startSetDocuments } from './../actions/documents';
import Loader from "./App";

class DocumentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true
    }
  }

  componentDidMount() {
    const { startSetDocuments } = this.props;
    startSetDocuments().then(() => {
      this.setState(() => ({ loadingData: false }))
    })
  }

  render () {
    if(this.state.loadingData) {
      return (
        <Loader />
      )
    } else {
      const { documents } = this.props;
      return (
        <Layout>
          <div className="content-container">
            <h1>Your Documents</h1>
            { documents.map((document, index) => (
              <div key={index}>
                { document.id }
              </div>
            )) }
          </div>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  documents: state.documents
})

const mapDispatchToProps = (dispatch) => ({
  startSetDocuments: () => dispatch(startSetDocuments())
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage)
