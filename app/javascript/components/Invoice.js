import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { withTranslation } from "react-i18next";

import { fromCentsToDollars } from "../lib/money";
import { getDateFormat } from "../lib/date";

const styles = StyleSheet.create({
  page: { flexDirection: "column" },
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
    borderBottom: "1 solid #BDBDBD"
  },
  rowWithoutBorder: {
    border: "0 solid #BDBDBD"
  },
  cell: {
    borderRight: "1 solid #BDBDBD",
    borderLeft: "1 solid #BDBDBD",
    width: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    alignSelf: "stretch",
    padding: 5,
    textAlign: "right"
  },
  cellHeader: {
    color: "#ffffff",
    textAlign: "center"
  },
  cellDescription: {
    width: 150,
    textAlign: "center"
  },
  cellProduct: {
    width: 75,
    textAlign: "center"
  },
  header: {
    backgroundColor: "#506C9D"
  },
  headerText: {
    fontSize: 11,
    fontWeight: 1200,
    color: "#1a245c"
  },
  tableText: {
    margin: 10,
    fontSize: 10,
    color: "#1a245c"
  },
  cellWithoutBorder: {
    border: "0 solid #BDBDBD"
  },
  cellCompanyDetails: {
    border: "0 solid #BDBDBD",
    padding: 0,
    width: 200
  }
});

const Invoice = ({ orderItems, order, user, invoice, t }) => (
  <Document>
    <Page style={styles.page} size="A4">
      <View
        style={
          (styles.table, { borderBottom: "1 black solid", paddingBottom: 10 })
        }
      >
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellCompanyDetails,
              { textAlign: "left", fontSize: 20 }
            ]}
          >
            {t("invoice.printandgo")}
          </Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellCompanyDetails,
              { fontSize: 20, color: "#BDBDBD" }
            ]}
          >
            {t("invoice.title")}
          </Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder, { marginTop: 10 }]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellCompanyDetails,
              { textAlign: "left" }
            ]}
          >
            {t("invoice.address")}
          </Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellCompanyDetails]}
          >
            Date: {getDateFormat(invoice.created_at)}
          </Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellCompanyDetails,
              { textAlign: "left" }
            ]}
          >
            {t("invoice.city")}, {t("invoice.postcode")}
          </Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellCompanyDetails]}
          >
            {t("invoice.number", { id: invoice.id })}
          </Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellCompanyDetails,
              { textAlign: "left" }
            ]}
          >
            {t("invoice.website")}
          </Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellCompanyDetails,
              { textAlign: "left" }
            ]}
          >
            {t("invoice.contact")}
          </Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
        </View>
      </View>

      <View style={(styles.table, { paddingBottom: 10, marginBottom: 10 })}>
        <View style={[styles.row, styles.rowWithoutBorder, { marginTop: 10 }]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellCompanyDetails,
              { textAlign: "left" }
            ]}
          >
            {t("invoice.billTo", { fullname: user.fullname })}
          </Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellCompanyDetails]}
          ></Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellCompanyDetails,
              { textAlign: "left" }
            ]}
          >
            {t("invoice.email", { email: user.email })}
          </Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
        </View>
      </View>
      <View style={styles.table}>
        <View style={[styles.row, styles.header]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellHeader,
              styles.cellProduct
            ]}
          >
            {t("invoice.product")}
          </Text>
          {invoice.print_order_invoice && (
            <Text
              style={[
                styles.headerText,
                styles.cell,
                styles.cellHeader,
                styles.cellDescription
              ]}
            >
              {t("invoice.description")}
            </Text>
          )}
          {invoice.print_order_invoice && (
            <Text style={[styles.headerText, styles.cell, styles.cellHeader]}>
              {t("invoice.numberOfPage")}
            </Text>
          )}
          <Text style={[styles.headerText, styles.cell, styles.cellHeader]}>
            {t("invoice.quantity")}
          </Text>
          <Text style={[styles.headerText, styles.cell, styles.cellHeader]}>
            {t("invoice.unitPrice")}
          </Text>
          <Text style={[styles.headerText, styles.cell, styles.cellHeader]}>
            {t("invoice.lineTotal")}
          </Text>
        </View>
        {orderItems.map((orderItem, index) => (
          <View key={index} style={[styles.row]}>
            <Text style={[styles.headerText, styles.cell, styles.cellProduct]}>
              {t(`${orderItem.product.code}.name`)}
            </Text>
            {invoice.print_order_invoice && (
              <Text
                style={[styles.headerText, styles.cell, styles.cellDescription]}
              >
                {orderItem.description}
              </Text>
            )}
            {orderItem.document && (
              <Text style={[styles.headerText, styles.cell]}>
                {orderItem.document.number_of_page}
              </Text>
            )}
            <Text style={[styles.headerText, styles.cell]}>
              {orderItem.quantity}
            </Text>
            <Text style={[styles.headerText, styles.cell]}>
              {fromCentsToDollars(orderItem.price)}
            </Text>
            <Text style={[styles.headerText, styles.cell]}>
              {fromCentsToDollars(orderItem.sub_total)}
            </Text>
          </View>
        ))}
        <View style={[styles.row, styles.rowWithoutBorder, { marginTop: 5 }]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellProduct
            ]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellDescription,
              styles.cellWithoutBorder
            ]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {t("invoice.subtotal")}
          </Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {fromCentsToDollars(order.sub_total)}
          </Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellProduct
            ]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellDescription
            ]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {t("invoice.taxAmount")}
          </Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {fromCentsToDollars(order.tax_amount)}
          </Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellProduct
            ]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellDescription
            ]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {t("invoice.total")}
          </Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {fromCentsToDollars(order.total)}
          </Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellProduct
            ]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellDescription
            ]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {t("invoice.paid")}
          </Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {fromCentsToDollars(order.total_paid)}
          </Text>
        </View>
        <View style={[styles.row, styles.rowWithoutBorder]}>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellProduct
            ]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              styles.cellDescription
            ]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[styles.headerText, styles.cell, styles.cellWithoutBorder]}
          ></Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {t("invoice.totalDue")}
          </Text>
          <Text
            style={[
              styles.headerText,
              styles.cell,
              styles.cellWithoutBorder,
              { padding: 0 }
            ]}
          >
            {fromCentsToDollars(order.total_due)}
          </Text>
        </View>
        <View style={[styles.row, { marginTop: 5, border: "0 black solid" }]}>
          <Text style={{ color: "#506C9D" }}>
            {t("invoice.thankYouForYourBusiness")}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default withTranslation()(Invoice);
