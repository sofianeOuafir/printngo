import React, { Fragment } from "react";
import { withTranslation } from "react-i18next";

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
      partnerCreated:
        (partnerApplication && partnerApplication.partner_created) || false,
      phoneNumber:
        (partnerApplication && partnerApplication.phone_number) || "",
      bankDetails:
        (partnerApplication && partnerApplication.bank_details) || "",
      contract: (partnerApplication && partnerApplication.contract) || "",
      errors: {
        firstname: [],
        lastname: [],
        email: [],
        companyName: [],
        companyAddress: [],
        postcode: [],
        phoneNumber: [],
        bankDetails: []
      }
    };
  }

  triggerFileDialog = () => {
    const { partnerCreated } = this.state;
    if (!partnerCreated) {
      document.getElementById("contractInput").click();
    }
  };

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

  onPhoneNumberChange = e => {
    const phoneNumber = e.target.value;
    if (!isNaN(phoneNumber)) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, phoneNumber: [] },
        phoneNumber
      }));
    }
  };

  onContractUpload = async e => {
    const contract = e.target.files[0];
    this.setState(() => ({ contract }));
  };

  onBankDetailsChange = e => {
    const bankDetails = e.target.value;
    this.setState(prevState => ({
      errors: { ...prevState.errors, bankDetails: [] },
      bankDetails
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
      archived,
      phoneNumber: phone_number,
      bankDetails: bank_details,
      contract
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
      archived,
      phone_number,
      bank_details,
      contract
    };

    const formData = new FormData();

    for (const key of Object.keys(partnerApplication)) {
      if (key != "contract" || (key == "contract" && partnerApplication[key])) {
        formData.append(key, partnerApplication[key]);
      }
    }

    this.props.onSubmit(formData).catch(e => {
      const errors = JSON.parse(e.response.data.errors);
      const {
        email,
        firstname,
        lastname,
        postcode,
        company_address,
        company_name,
        phone_number,
        bank_details
      } = errors;
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          email,
          firstname,
          lastname,
          postcode,
          companyAddress: company_address,
          companyName: company_name,
          phoneNumber: phone_number,
          bankDetails: bank_details
        }
      }));
    });
  };

  render() {
    const { showAdminFields = true, t } = this.props;
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
      partnerCreated,
      phoneNumber,
      bankDetails,
      errors
    } = this.state;
    return (
      <form
        className="form__input-container partner-application-page-form"
        onSubmit={this.onSubmit}
      >
        {partnerCreated && (
          <p className="text-leaf m0 h5">
            {t("partnerApplicationForm.notEditable")}
          </p>
        )}
        <h2 className="text-navy h5">
          {t("partnerApplicationForm.aboutYou")}:
        </h2>
        <div className="flex partner-application-page-form--input-container">
          <div className="col-6 mr1 mb05">
            <TextInput
              disabled={partnerCreated}
              errors={errors.firstname}
              onChange={this.onFirstnameChange}
              value={firstname}
              placeholder={t("partnerApplicationForm.firstname")}
            />
          </div>
          <div className="col-6 mb05">
            <TextInput
              disabled={partnerCreated}
              errors={errors.lastname}
              onChange={this.onLastnameChange}
              value={lastname}
              placeholder={t("partnerApplicationForm.lastname")}
            />
          </div>
        </div>
        <div className="mb05">
          <TextInput
            disabled={partnerCreated}
            errors={errors.email}
            onChange={this.onEmailChange}
            value={email}
            type="text"
            placeholder={t("partnerApplicationForm.email")}
          />
        </div>
        <div className="mb05">
          <TextInput
            disabled={partnerCreated}
            errors={errors.phoneNumber}
            onChange={this.onPhoneNumberChange}
            value={phoneNumber}
            placeholder={t("partnerApplicationForm.phoneNumber")}
          />
        </div>
        <h2 className="text-navy h5">
          {t("partnerApplicationForm.aboutYourCompany")}:
        </h2>
        <div className="flex partner-application-page-form--input-container">
          <div className="col-6 mr1 mb05">
            <TextInput
              disabled={partnerCreated}
              errors={errors.companyName}
              onChange={this.onCompanyNameChange}
              value={companyName}
              placeholder={t("partnerApplicationForm.companyName")}
            />
          </div>
          <div className="col-6 mb05">
            <TextInput
              disabled={partnerCreated}
              errors={errors.postcode}
              onChange={this.onPostcodeChange}
              value={postcode}
              placeholder={t("partnerApplicationForm.postcode")}
            />
          </div>
        </div>
        <div className="mb05">
          <TextInput
            disabled={partnerCreated}
            errors={errors.companyAddress}
            onChange={this.onCompanyAddressChange}
            value={companyAddress}
            type="text"
            placeholder={t("partnerApplicationForm.companyAddress")}
          />
        </div>
        <div className="mb05">
          <TextInput
            disabled={partnerCreated}
            errors={errors.bankDetails}
            onChange={this.onBankDetailsChange}
            value={bankDetails}
            type="text"
            placeholder={t("partnerApplicationForm.bankDetails")}
          />
        </div>

        {showAdminFields && (
          <Fragment>
            <div className="flex partner-application-page-form--input-container">
              <div className="col-6 mr1 mb05">
                <TextInput
                  disabled={partnerCreated}
                  onChange={this.onCityChange}
                  value={city}
                  placeholder={t("partnerApplicationForm.city")}
                />
              </div>
              <div className="col-6 mb05">
                <TextInput
                  disabled={partnerCreated}
                  onChange={this.onCountryChange}
                  value={country}
                  placeholder={t("partnerApplicationForm.country")}
                />
              </div>
            </div>
            <div className="flex partner-application-page-form--input-container">
              <div className="col-6 mr1 mb05">
                <TextInput
                  disabled={partnerCreated}
                  onChange={this.onLatitudeChange}
                  value={lat}
                  placeholder={t("partnerApplicationForm.latitude")}
                />
              </div>
              <div className="col-6 mb05">
                <TextInput
                  disabled={partnerCreated}
                  onChange={this.onLontitudeChange}
                  value={lng}
                  placeholder={t("partnerApplicationForm.longitude")}
                />
              </div>
            </div>
            <div className="mb05">
              <TextInput
                disabled={partnerCreated}
                onChange={this.onOpeningHoursChange}
                value={openingHours}
                type="text"
                placeholder={t("partnerApplicationForm.openingHours")}
              />
            </div>
            {this.props.partnerApplication &&
              this.props.partnerApplication.contract_url && (
                <div className="mb1">
                  <a
                    target="_blank"
                    className="button button--navy button--no-border-radius fullwidth px0"
                    href={this.props.partnerApplication.contract_url}
                  >
                    {t("partnerApplicationForm.seeContract")}
                  </a>
                </div>
              )}
            <div className="mb1">
              <a
                disabled={partnerCreated}
                onClick={this.triggerFileDialog}
                className={`button ${
                  partnerCreated ? "button--grey" : "button-outline--navy"
                } fullwidth px0 button--no-border-radius`}
              >
                {t("partnerApplicationForm.uploadNewContract")}
              </a>
              <TextInput
                className="hide"
                id="contractInput"
                type="file"
                onChange={this.onContractUpload}
              />
            </div>
            <div className="mb1">
              <label className="flex align-items--center">
                <TextInput
                  disabled={partnerCreated}
                  onChange={this.onArchivedChange}
                  checked={archived}
                  type="checkbox"
                />
                <span>{t("partnerApplicationForm.archived")}</span>
              </label>
            </div>
          </Fragment>
        )}
        <button
          disabled={partnerCreated}
          className={`fullwidth button ${
            partnerCreated ? "button--grey" : "button--leaf"
          }`}
          text="Submit"
        >
          {t("partnerApplicationForm.submit")}
        </button>
      </form>
    );
  }
}

export default withTranslation()(PartnerApplicationForm);
