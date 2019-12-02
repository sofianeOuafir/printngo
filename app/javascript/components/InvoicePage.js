import React from "react";
import { BlobProvider } from "@react-pdf/renderer";
import axios from "axios";
import { withRouter } from "react-router-dom";

import Loader from "./Loader";
import Invoice from "./Invoice";
import DocumentShowPage from "./DocumentShowPage";

class InvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      invoice: {}
    };
  }
  componentDidMount() {
    axios
      .get(`/api/v1/invoices/${this.props.match.params.id}`)
      .then(response => {
        const invoice = response.data;
        this.setState(() => ({ loadingData: false, invoice }));
      });
  }
  render() {
    const { invoice, loadingData } = this.state;
    const { order_items: orderItems, order, user } = invoice;

    if (loadingData) {
      return <Loader />;
    } else {
      return (
        <BlobProvider
          document={
            <Invoice
              invoice={invoice}
              orderItems={orderItems}
              order={order}
              user={user}
            />
          }
        >
          {({ url }) => {
            return url && <DocumentShowPage url={url} />;
          }}
        </BlobProvider>
      );
    }
  }
}

export default withRouter(InvoicePage);
