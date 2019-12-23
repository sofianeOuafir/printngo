import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import SellingPointList from "./SellingPointList";
import { fromCentsToDollars } from "./../lib/money";

const TopUpProduct = ({ CallToAction, topUpProduct, t }) => {
  const {
    selling_points,
    code,
    most_popular,
    id,
    price,
    allocated_credit: allocatedCredit
  } = topUpProduct;
  return (
    <div className="fullheight top-up-product" style={{ overflow: "hidden" }}>
      <div
        className={
          topUpProduct.most_popular
            ? "top-up-product--most-popular flex flex-direction--vertical justify-content--center align-items--center bg-pink text-white center"
            : "top-up-product--not-most-popular"
        }
      >
        <span className="h4">
          {topUpProduct.most_popular ? t('mostPopular') : ""}
        </span>
      </div>
      <div
        className={`px1 pt1 border fullheight border-color--grey ${
          topUpProduct.most_popular ? "border-top--none" : ""
        }`}
        style={{
          background: `${most_popular && "rgba(255, 117, 124, 0.2)"}`
        }}
      >
        <div className="center top-up-product--name-container">
          <span
            className={`m0
            text-navy
           h4 `}
          >
            <strong>
              {t(`${code}.name`, { price: fromCentsToDollars(price) })}
            </strong>
          </span>
        </div>
        <div className="mb1 top-up-product--description-container border--bottom border-color--navy pb1">
          <h2 className="px1 text-navy h5 favourite-font-weight center">
            <strong>
              {t(`${code}.description`, {
                allocatedCredit: fromCentsToDollars(allocatedCredit)
              })}
            </strong>
          </h2>
        </div>

        <div style={{ height: "60px" }} className="center">
          {CallToAction ? (
            <CallToAction />
          ) : (
            <Link
              to={`/top-up/${id}`}
              className={`button ${
                most_popular
                  ? "button--pink"
                  : "button--outline button-outline--pink"
              }`}
            >
              {t('callToAction.buyNow')}
            </Link>
          )}
        </div>
        <div className="pb1">
          <SellingPointList sellingPoints={selling_points} />
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(TopUpProduct);
