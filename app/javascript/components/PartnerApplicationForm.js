import React, { Fragment } from "react";

import TextInput from "./TextInput";

class PartnerApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    const partnerApplication = props.partnerApplication;
    this.state = {
      firstname: (partnerApplication && partnerApplication.firstname) || "",
      lastname: (partnerApplication && partnerApplication.lastname) || "",
      email: (partnerApplication && partnerApplication.email) || "",
      companyName:
        (partnerApplication && partnerApplication.company_name) || "",
      companyAddress:
        (partnerApplication && partnerApplication.company_address) || "",
      postcode: (partnerApplication && partnerApplication.postcode) || "",
      city: (partnerApplication && partnerApplication.city) || "",
      country: (partnerApplication && partnerApplication.country) || "",
      lat: (partnerApplication && partnerApplication.lat) || "",
      lng: (partnerApplication && partnerApplication.lng) || "",
      openingHours:
        (partnerApplication && partnerApplication.opening_hours) || "",
      archived: (partnerApplication && partnerApplication.archived) || false,
      errors: {
        firstname: [],
        lastname: [],
        email: [],
        companyName: [],
        companyAddress: [],
        postcode: []
      }
    };
  }

  onFirstnameChange = e => {
    const firstname = e.target.value;
    this.setState(prevState => ({
      errors: { ...prevState.errors, firstname: [] },
      firstname
    }));
  };

  onLastnameChange = e => {
    const lastname = e.target.value;
    this.setState(prevState => ({
      errors: { ...prevState.errors, lastname: [] },
      lastname
    }));
  };

  onEmailChange = e => {
    const email = e.target.value;
    this.setState(prevState => ({
      errors: { ...prevState.errors, email: [] },
      email
    }));
  };

  onCompanyNameChange = e => {
    const companyName = e.target.value;
    this.setState(prevState => ({
      errors: { ...prevState.errors, companyName: [] },
      companyName
    }));
  };

  onCityChange = e => {
    const city = e.target.value;
    this.setState(() => ({
      city
    }));
  };

  onOpeningHoursChange = e => {
    const openingHours = e.target.value;
    this.setState(() => ({
      openingHours
    }));
  };

  onCountryChange = e => {
    const country = e.target.value;
    this.setState(() => ({
      country
    }));
  };

  onLatitudeChange = e => {
    const lat = e.target.value;
    this.setState(() => ({
      lat
    }));
  };

  onLontitudeChange = e => {
    const lng = e.target.value;
    this.setState(() => ({
      lng
    }));
  };

  onCompanyAddressChange = e => {
    const companyAddress = e.target.value;
    this.setState(prevState => ({
      errors: { ...prevState.errors, companyAddress: [] },
      companyAddress
    }));
  };

  onPostcodeChange = e => {
    const postcode = e.target.value;
    this.setState(prevState => ({
      errors: { ...prevState.errors, postcode: [] },
      postcode
    }));
  };

  onArchivedChange = () => {
    const archived = !this.state.archived;
    this.setState(() => ({
      archived
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      postcode,
      companyAddress: company_address,
      companyName: company_name,
      openingHours: opening_hours,
      city,
      country,
      lat,
      lng,
      archived
    } = this.state;
    const partnerApplication = {
      firstname,
      lastname,
      email,
      postcode,
      company_address,
      company_name,
      city,
      country,
      lat,
      lng,
      opening_hours,
      archived
    };

    this.props.onSubmit(partnerApplication).catch(e => {
      const errors = JSON.parse(e.response.data.errors);
      const {
        email,
        firstname,
        lastname,
        postcode,
        company_address,
        company_name
      } = errors;
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          email,
          firstname,
          lastname,
          postcode,
          companyAddress: company_address,
          companyName: company_name
        }
      }));
    });
  };

  render() {
    const { showAdminFields = true } = this.props;
    const {
      firstname,
      lastname,
      email,
      postcode,
      companyAddress,
      companyName,
      city,
      country,
      lat,
      lng,
      openingHours,
      archived,
      errors
    } = this.state;
    return (
      <form
        className="form__input-container partner-application-page-form"
        onSubmit={this.onSubmit}
      >
        <h2 className="text-navy h5">About you:</h2>
        <div className="flex partner-application-page-form--input-container">
          <div className="col-6 mr1">
            <TextInput
              errors={errors.firstname}
              onChange={this.onFirstnameChange}
              className="mb1"
              value={firstname}
              placeholder="Firstname"
            />
          </div>
          <div className="col-6">
            <TextInput
              errors={errors.lastname}
              onChange={this.onLastnameChange}
              value={lastname}
              className="mb1"
              placeholder="Lastname"
            />
          </div>
        </div>
        <div>
          <TextInput
            errors={errors.email}
            onChange={this.onEmailChange}
            value={email}
            className="mb1"
            type="text"
            placeholder="Email"
          />
        </div>
        <h2 className="text-navy h5">About your company:</h2>
        <div className="flex partner-application-page-form--input-container">
          <div className="col-6 mr1">
            <TextInput
              errors={errors.companyName}
              onChange={this.onCompanyNameChange}
              value={companyName}
              className="mb1"
              placeholder="Company Name"
            />
          </div>
          <div className="col-6">
            <TextInput
              errors={errors.postcode}
              onChange={this.onPostcodeChange}
              value={postcode}
              className="mb1"
              placeholder="Postcode"
            />
          </div>
        </div>
        <div>
          <TextInput
            errors={errors.companyAddress}
            onChange={this.onCompanyAddressChange}
            value={companyAddress}
            className="mb1"
            type="text"
            placeholder="Company Address"
          />
        </div>

        {showAdminFields && (
          <Fragment>
            <div className="flex partner-application-page-form--input-container">
              <div className="col-6 mr1">
                <TextInput
                  onChange={this.onCityChange}
                  value={city}
                  className="mb1"
                  placeholder="City"
                />
              </div>
              <div className="col-6">
                <TextInput
                  onChange={this.onCountryChange}
                  value={country}
                  className="mb1"
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="flex partner-application-page-form--input-container">
              <div className="col-6 mr1">
                <TextInput
                  onChange={this.onLatitudeChange}
                  value={lat}
                  className="mb1"
                  placeholder="Latitude"
                />
              </div>
              <div className="col-6">
                <TextInput
                  onChange={this.onLontitudeChange}
                  value={lng}
                  className="mb1"
                  placeholder="Lontitude"
                />
              </div>
            </div>
            <div>
              <TextInput
                onChange={this.onOpeningHoursChange}
                value={openingHours}
                className="mb1"
                type="text"
                placeholder="Opening Hours"
              />
            </div>
            <div className="mb1">
              <label className="flex align-items--center">
                <TextInput
                  onChange={this.onArchivedChange}
                  checked={archived}
                  type="checkbox"
                />
                <span>Archived</span>
              </label>
            </div>
          </Fragment>
        )}
        <button
          className={`fullwidth button button--pink
}`}
          text="Submit"
        >
          Submit
        </button>
      </form>
    );
  }
}

export default PartnerApplicationForm;
