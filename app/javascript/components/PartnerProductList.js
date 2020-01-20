import React from "react";

import PartnerProduct from "./PartnerProduct";

const PartnerProductList = ({ products, readOnly = true }) => {
  return (
    <div className="partner-product-list--container flex justify-content-around">
      {products.map((product, index) => (
        <div
          key={index}
          className={`thirdwidth border border-color--grey ${
            products.length == index + 1 ? "" : "mr1"
          }`}
        >
          <PartnerProduct readOnly={readOnly} product={product} />
        </div>
      ))}
    </div>
  );
};

export default PartnerProductList;
