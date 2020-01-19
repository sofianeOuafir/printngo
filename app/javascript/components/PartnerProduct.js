import React from "react";
import Toggle from "react-toggle";
import axios from "axios";
import { toast } from "react-toastify";

import images from "./../images";
import TextInput from "./TextInput";
import "react-toggle/style.css";
import { fromCentsToDollars, fromDollarsToCents } from "./../lib/money";

class PartnerProduct extends React.Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    const { active, name, description, price, id } = product;
    this.state = {
      id,
      active,
      name: name || "",
      description: description || "",
      price: ((price || price == 0) && fromCentsToDollars(price, false)) || "",
      errors: {
        name: [],
        description: [],
        price: []
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
    const { active, name, description, price, id } = this.state;
    let priceInCents = fromDollarsToCents(price);
    priceInCents = priceInCents || priceInCents == 0 ? priceInCents : "";
    const partnerProduct = {
      active,
      name,
      description,
      price: priceInCents
    };
    axios
      .patch(`/api/v1/partners/partner_products/${id}`, partnerProduct)
      .then(response => {
        const { active, name, description, price } = response.data;
        this.setState(
          () => ({
            active,
            name,
            description,
            price: fromCentsToDollars(price, false) || "",
            errors: {
              name: [],
              price: []
            }
          }),
          () => {
            toast.success("Product saved successfully", {
              position: toast.POSITION.BOTTOM_LEFT
            });
          }
        );
      })
      .catch(e => {
        toast.error(
          "The product hasn't been published. Resolve the errors and try publishing again!",
          {
            position: toast.POSITION.BOTTOM_LEFT
          }
        );
        const errors = JSON.parse(e.response.data.errors);
        const { price, name, description } = errors;
        this.setState(prevState => ({
          active: false,
          errors: {
            ...prevState.errors,
            price,
            name,
            description
          }
        }));
      });
  };

  render() {
    const { active, name, description, price, id, errors } = this.state;
    return (
      <div className="border border-color--grey">
        <img
          src={images.partnerProductDefault}
          className="fullwidth"
          alt="Partner Product Default"
        />
        <form
          onSubmit={this.onSubmit}
          className="form__input-container px2 py1"
        >
          <div className="mb05">
            <TextInput
              errors={errors.name}
              value={name}
              onChange={this.onNameChange}
              label="Provide a name"
              placeholder="E.g Ray Ban Sunglasses"
            />
          </div>
          <div className="mb05">
            <TextInput
              errors={errors.description}
              value={description}
              onChange={this.onDescriptionChange}
              label="Provide a short description (Optional)"
              placeholder="E.g. Available in a range of colours like..."
            />
          </div>
          <div className="flex mb05">
            <div className="flex halfwidth flex-direction--column">
              <Toggle
                className="mb05"
                id={`${id}-partner-product-active`}
                checked={active}
                onChange={this.onActiveChange}
              />
              <label
                className="text-navy"
                htmlFor={`${id}-partner-product-active`}
              >
                {active ? "Published" : "Unpublished"}
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
                label="$"
                labelClassName="h3 text-navy"
                placeholder="E.g. 19.99"
              />
            </div>
          </div>

          <button className="button button--leaf fullwidth px0">Save</button>
        </form>
      </div>
    );
  }
}

export default PartnerProduct;
