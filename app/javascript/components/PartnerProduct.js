import React, { Fragment } from "react";
import Toggle from "react-toggle";
import axios from "axios";
import { toast } from "react-toastify";
import { withTranslation } from "react-i18next";

import images from "./../images";
import TextInput from "./TextInput";
import {
  fromCentsToDollars,
  fromDollarsToCents,
  dollarsWithDevise
} from "./../lib/money";

class PartnerProduct extends React.Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    const { active, name, description, price, id, link } = product;
    this.state = {
      id,
      active,
      name: name || "",
      description: description || "",
      link: link || "",
      price: ((price || price == 0) && fromCentsToDollars(price, false)) || "",
      errors: {
        name: [],
        description: [],
        price: [],
        link: []
      }
    };
  }

  onActiveChange = e => {
    const { checked: active } = e.target;
    this.setState(() => ({ active }));
  };

  onNameChange = e => {
    const { value: name } = e.target;
    if (name.length <= 50) {
      this.setState(prevState => ({
        name,
        errors: { ...prevState.errors, name: [] }
      }));
    }
  };

  onDescriptionChange = e => {
    const { value: description } = e.target;
    if (description.length <= 100) {
      this.setState(prevState => ({
        description,
        errors: { ...prevState.errors, description: [] }
      }));
    }
  };

  onLinkChange = e => {
    const { value: link } = e.target;
    this.setState(prevState => ({
      link,
      errors: { ...prevState.errors, link: [] }
    }));
  };

  onPriceChange = e => {
    const { value: price } = e.target;
    if (!isNaN(price)) {
      this.setState(prevState => ({
        price,
        errors: { ...prevState.errors, price: [] }
      }));
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { t } = this.props;
    const { active, name, description, price, id, link } = this.state;
    let priceInCents = fromDollarsToCents(price);
    priceInCents = priceInCents || priceInCents == 0 ? priceInCents : "";
    const partnerProduct = {
      active,
      name,
      description,
      link,
      price: priceInCents
    };
    axios
      .patch(`/api/v1/partners/partner_products/${id}`, partnerProduct)
      .then(response => {
        const { active, name, description, price, link } = response.data;
        this.setState(
          () => ({
            active,
            name: name || "",
            description: description || "",
            link: link || "",
            price: fromCentsToDollars(price, false) || "",
            errors: {
              name: [],
              description: [],
              price: [],
              link: []
            }
          }),
          () => {
            toast.success(t("partnerProduct.successNotification"), {
              position: toast.POSITION.BOTTOM_LEFT
            });
          }
        );
      })
      .catch(e => {
        toast.error(t("partnerProduct.errorNotification"), {
          position: toast.POSITION.BOTTOM_LEFT
        });
        const errors = JSON.parse(e.response.data.errors);
        const { price, name, description, link } = errors;
        this.setState(prevState => ({
          active: false,
          errors: {
            ...prevState.errors,
            price,
            name,
            link,
            description
          }
        }));
      });
  };

  render() {
    const { t, readOnly = true } = this.props;
    const { active, name, description, price, id, errors, link } = this.state;
    const Image = () => (
      <img
        src={images.partnerProductDefault}
        className="fullwidth"
        alt={t("partnerProduct.imageProductDefaultAlt")}
      />
    );

    const Container = ({ children, className, ...props }) =>
      link ? (
        <a
          href={link}
          target="_blank"
          className={`${className} text-decoration--none`}
        >
          {children}
        </a>
      ) : (
        <div className={className} {...props}>
          {children}
        </div>
      );
    return (
      <Fragment>
        {readOnly ? (
          <Container className="flex flex-direction--column justify-content--between fullheight">
            <Image />
            <p
              className={`${
                link ? "text-decoration--underline" : ""
              } px2 mt05 mb05 text-navy h4 word-wrap--break-word`}
            >
              <strong>{name} </strong>
            </p>
            <p className="px2 mt05 mb05 text-navy word-wrap--break-word">
              {description}
            </p>
            <p className="px2 text-navy h4">
              <strong>{dollarsWithDevise(price)}</strong>
            </p>
          </Container>
        ) : (
          <form onSubmit={this.onSubmit} className="form__input-container mb05">
            <Image />
            <div className="mb05 px2">
              <TextInput
                errors={errors.name}
                value={name}
                onChange={this.onNameChange}
                label={t("partnerProduct.nameLabel")}
                placeholder={t("partnerProduct.namePlaceholder")}
              />
            </div>
            <div className="mb05 px2">
              <TextInput
                errors={errors.description}
                value={description}
                onChange={this.onDescriptionChange}
                label={t("partnerProduct.descriptionLabel")}
                placeholder={t("partnerProduct.descriptionPlaceholder")}
              />
            </div>
            <div className="mb05 px2">
              <TextInput
                errors={errors.link}
                value={link}
                onChange={this.onLinkChange}
                label={t("partnerProduct.linkLabel")}
                placeholder={t("partnerProduct.linkPlaceholder")}
              />
            </div>
            <div className="flex mb05 px2">
              <div className="flex halfwidth flex-direction--column">
                <Toggle
                  className="mb05 block"
                  id={`${id}-partner-product-active`}
                  checked={active}
                  onChange={this.onActiveChange}
                />
                <label
                  className="text-navy"
                  htmlFor={`${id}-partner-product-active`}
                >
                  {active
                    ? t("partnerProduct.published")
                    : t("partnerProduct.unpublished")}
                </label>
              </div>
              <div className="halfwidth flex justify-content--end">
                <TextInput
                  style={{ paddingRight: "0px", paddingLeft: "0px" }}
                  className="fullwidth"
                  labelDirection="row"
                  errors={errors.price}
                  onChange={this.onPriceChange}
                  value={price}
                  label={t("partnerProduct.priceLabel")}
                  labelClassName="h3 text-navy"
                  placeholder={t("partnerProduct.pricePlaceholder")}
                />
              </div>
            </div>
            <div className="px1">
              <button className="button button--leaf fullwidth px0">
                {t("partnerProduct.save")}
              </button>
            </div>
          </form>
        )}
      </Fragment>
    );
  }
}

export default withTranslation()(PartnerProduct);
