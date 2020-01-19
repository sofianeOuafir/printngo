import React from "react";
import Toggle from "react-toggle";
import axios from "axios";
import { toast } from "react-toastify";

import images from "./../images";
import TextInput from "./TextInput";
import "react-toggle/style.css";

class PartnerProduct extends React.Component {
  constructor(props) {
    super(props);
    const { product } = this.props;
    const { active, name, description, price, id } = product;
    this.state = {
      id,
      active,
      name: (product && name) || "",
      description: (product && description) || "",
      price: (product && price) || "",
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
    this.setState(prevState => ({
      name,
      errors: { ...prevState.errors, name: [] }
    }));
  };

  onDescriptionChange = e => {
    const { value: description } = e.target;
    this.setState(prevState => ({
      description,
      errors: { ...prevState.errors, description: [] }
    }));
  };

  onPriceChange = e => {
    const { value: price } = e.target;
    this.setState(prevState => ({
      price,
      errors: { ...prevState.errors, price: [] }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { active, name, description, price, id } = this.state;
    const partnerProduct = { active, name, description, price };
    axios
      .patch(`/api/v1/partners/partner_products/${id}`, partnerProduct)
      .then(response => {
        const { active, name, description, price } = response.data;
        this.setState(
          () => ({
            active,
            name,
            description,
            price,
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
          <div className="flex align-items--center">
            <div className="flex flex-direction--column col-8">
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
            <div className="mb05">
              <TextInput
                labelDirection="row"
                errors={errors.price}
                onChange={this.onPriceChange}
                value={price}
                label="$"
                labelClassName="h3 text-navy"
                placeholder="Price: Eg. 19.99"
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
