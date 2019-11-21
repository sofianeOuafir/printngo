import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import PageBanner from "./PageBanner";
import TextInput from "./TextInput";
import images from "./../images";

class PartnerApplicationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      companyName: "",
      companyAddress: "",
      postcode: "",
      errors: {
        firstname: [],
        lastname: [],
        email: [],
        companyName: [],
        companyAddress: [],
        postcode: []
      },
      applied: false
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

  onSubmit = e => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      postcode,
      companyAddress: company_address,
      companyName: company_name
    } = this.state;
    const partnerApplication = {
      firstname,
      lastname,
      email,
      postcode,
      company_address,
      company_name
    };
    axios
      .post("/api/v1/partner_applications", partnerApplication)
      .then(() => {
        this.setState(() => ({ applied: true }));
      })
      .catch(e => {
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
    const {
      firstname,
      lastname,
      email,
      postcode,
      companyAddress,
      companyName,
      errors,
      applied
    } = this.state;
    return (
      <div className="content-container pb3 mb3">
        <PageBanner
          title="Become a Print n' Go Partner"
          description="Want to attract more customers in your shop while making money off your printing machine? Your are in the right place! Simply fill up the form and we will get back to you as soon as possible. "
        />
        {applied ? (
          <div className="partner-application-page--thank-you content-container border border-color--grey h5 flex justify-content--center">
            <div className="my2">
              <div className="center">
                <img src={images.success} alt="Success Icon" width={100} />
              </div>
              <h1 className="h4 center">Success!</h1>
              <div>
                <p className="center">
                  Thank you for completing the form! We will get back to you
                  shortly!
                </p>
              </div>
              <div className="flex justify-content--center">
                <Link className="mt3 button button--pink" to={`/become-partner`}>
                  Finish
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="border border-color--grey p1">
              <form className="form__input-container partner-application-page-form" onSubmit={this.onSubmit}>
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
                <button
                  className={`fullwidth button button--pink
      }`}
                  text="Submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PartnerApplicationPage;
