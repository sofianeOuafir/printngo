import React from "react"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from './Layout';
import { startSetDocuments } from './../actions/documents';
import Loader from "./App";
import UploadAndPrintButton from './UploadAndPrintButton';
import DocumentList from './DocumentList';

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
      const { orderItems } = this.props;
      return (
        <Layout>
          <div className="content-container">
            <div className="sticky bg-white flex align-items--center justify-content--between" style={{ height: '75px' }}>
              <h1 className="favourite-font-weight h4">Your Documents</h1>
              {orderItems.length > 0 && <Link to="/order/basket" className="button button--pink" >Checkout &rarr;</Link>}
            </div>
            <div>
              <DocumentList />
              <UploadAndPrintButton text="Upload & Add To Basket" className="button button--navy" />
            </div>

          </div>
        </Layout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  orderItems: state.orderItems
})

const mapDispatchToProps = (dispatch) => ({
  startSetDocuments: () => dispatch(startSetDocuments())
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage)
