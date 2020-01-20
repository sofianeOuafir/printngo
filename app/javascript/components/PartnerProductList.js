import React from "react";

import PartnerProduct from "./PartnerProduct";

const PartnerProductList = ({ products, readOnly = true }) => {
  return (
    <div className="partner-product-list--container flex justify-content-around">
      {products.map((product, index) => (
        <div
          key={index}
          style={{ marginRight: `${
            products.length == index + 1 ? "" : "5px"
          }` }}
          className={`thirdwidth border border-color--grey`}
        >
          <PartnerProduct readOnly={readOnly} product={product} />
        </div>
      ))}
    </div>
  );
};

export default PartnerProductList;
