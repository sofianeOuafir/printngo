import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Loader from './Loader';
import { fromCentsToDollars } from './../utils/money';

const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 25 },
  table: {
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 35,
    border: '1 black solid'
  },
  cell: {
    border: '1 black solid',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch",
    padding: 5
  },
  header: {
    backgroundColor: "#eee"
  },
  headerText: {
    fontSize: 11,
    fontWeight: 1200,
    color: "#1a245c"
  },
  tableText: {
    margin: 10,
    fontSize: 10,
    color: 'neutralDark'
  }
});

class InvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      orderItems: [],
      order: {}
    }
  }
  componentDidMount() {
    axios.get(`/api/v1/invoices/${this.props.match.params.id}`).then((response) => {
      const invoice = response.data;
      const { order_items: orderItems, order } = invoice;
      this.setState(() => ({ loadingData: false, orderItems, order }))
    })
  }
  render() {
    const { orderItems, loadingData, order } = this.state;
    if(loadingData) {
      return <Loader />
    } else {
      return (
        <PDFViewer className="fullwidth fullheight absolute">
          <Document>
            <Page style={styles.page} size="A4" wrap>
              <View style={styles.table}>
                <View style={[styles.row, styles.header]}>
                  <Text style={[styles.headerText, styles.cell]}>Product</Text>
                  <Text style={[styles.headerText, styles.cell]}>Description</Text>
                  <Text style={[styles.headerText, styles.cell]}>Nb Pages</Text>
                  <Text style={[styles.headerText, styles.cell]}>Quantity</Text>
                  <Text style={[styles.headerText, styles.cell]}>Unit Price</Text>
                  <Text style={[styles.headerText, styles.cell]}>Line Total</Text>
                </View>
                { orderItems.map((orderItem, index) => ( 
                  <View key={index} style={[styles.row]}>
                    <Text style={[styles.headerText, styles.cell]}>{orderItem.product.name}</Text>
                    <Text style={[styles.headerText, styles.cell]}>{ orderItem.document.name }</Text>
                    <Text style={[styles.headerText, styles.cell]}>{ orderItem.document.number_of_page }</Text>
                    <Text style={[styles.headerText, styles.cell]}>{orderItem.quantity}</Text>
                    <Text style={[styles.headerText, styles.cell]}>{ fromCentsToDollars(orderItem.price) }</Text>
                    <Text style={[styles.headerText, styles.cell]}>{ fromCentsToDollars(orderItem.sub_total) }</Text>
                  </View>
                  )) }
                <View style={[styles.row]}>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}>Subtotal</Text>
                  <Text style={[styles.headerText, styles.cell]}>{ fromCentsToDollars(order.sub_total) }</Text>
                </View>
                <View style={[styles.row]}>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}>Tax Amount</Text>
                  <Text style={[styles.headerText, styles.cell]}>{ fromCentsToDollars(order.tax_amount) }</Text>
                </View>
                <View style={[styles.row]}>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}>Total</Text>
                  <Text style={[styles.headerText, styles.cell]}>{ fromCentsToDollars(order.total) }</Text>
                </View>
                <View style={[styles.row]}>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}>Paid</Text>
                  <Text style={[styles.headerText, styles.cell]}>{ fromCentsToDollars(order.total_paid) }</Text>
                </View>
                <View style={[styles.row]}>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}></Text>
                  <Text style={[styles.headerText, styles.cell]}>Total Due</Text>
                  <Text style={[styles.headerText, styles.cell]}>{ fromCentsToDollars(order.total_due) }</Text>
                </View>
                <View>
                  <Text>Thank you for your business!</Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )

    }
  }
}

export default withRouter(InvoicePage);



