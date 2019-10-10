import React from "react"
import { connect } from 'react-redux';
import axios from 'axios';

import Layout from './Layout';
import { startSetDocuments } from './../actions/documents';
import Loader from "./App";
import images from './../images';
import { getDateTimeFormat } from './../utils/date';

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

  onViewClick(id) {
    axios.get(`/api/v1/documents/${id}`).then((response) => {
      var win = window.open(response.data.url, '_blank');
      win.focus();
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
            <h1 className="favourite-font-weight h4">Your Documents</h1>
            { documents.map((document, index) => {
              const { name, created_at, id } = document;
              return (
              <div key={index} className="h5 flex align-items--center justify-content--between border border-color--grey p2 mb1">
                <div className="center">
                  <div>
                    <img src={images.aDocument} alt="Document Icon" width={40}/>
                  </div>
                  <div className="flex align-items--center mt1">
                    <a onClick={() => this.onViewClick(id)} className="mr1 pointer">View</a>
                    <a className="pointer" onClick={() => { this.onRemove(id) } }>Remove</a>
                  </div>
                </div>
                <div style={{ width: '100px'}} className="word-wrap--break-word">
                  <span title={name}>{name.length > 30 ? `${name.substring(0, 30)}...` : name}</span>
                </div>
                <div>
                  <span>{getDateTimeFormat(created_at)}</span>
                </div>
                <div>
                  <a to="/" className="button button--navy">Add To Basket</a>
                </div>
              </div>
            )}) }
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
