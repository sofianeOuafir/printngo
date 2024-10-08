import React, { Fragment } from "react";
import Modal from "react-modal";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Line } from "rc-progress";
import { withTranslation } from "react-i18next";

import { addOrderItem } from "./../actions/orderItems";
import { MdDone, MdHighlightOff } from "react-icons/md";
import { acceptedFormat } from "./../constants/constants";

class UploadAndPrintButton extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      isUploading: false,
      percentage: 0,
      uploadedFiles: []
    };
  }

  triggerFileDialog = () => {
    document.getElementById("fileInput").click();
  };

  openModal = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      percentage: 0,
      isUploading: false,
      uploadedFiles: []
    });
  };

  uploadUnsuccessful = () => {
    return (
      this.state.uploadedFiles.filter(element => element.success === false)
        .length > 0
    );
  };

  redirectToBasket = () => {
    const { history } = this.props;
    this.closeModal();
    history.push("/order/basket");
  };

  onUpload = ({ target }) => {
    const files = target.files;
    const { addOrderItem } = this.props;
    this.setState(
      () => ({ isUploading: true, uploadedFiles: [], percentage: 0 }),
      async () => {
        const uploadedFilesElement = document.getElementById("uploadedFiles");

        for (var i = 0; i < files.length; i++) {
          uploadedFilesElement.scrollTop = uploadedFilesElement.scrollHeight;
          const file = files[i];
          const { name: filename } = file;
          const formData = new FormData();
          formData.append("file", file);
          const percentage = Math.round(((i + 1) / files.length) * 100);
          try {
            const response = await axios.post(
              "/api/v1/print_orders/documents",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              }
            );
            const orderItem = response.data;

            addOrderItem(orderItem);
            this.setState(
              prevState => ({
                percentage,
                uploadedFiles: [
                  ...prevState.uploadedFiles,
                  { name: filename, success: true, message: "" }
                ]
              }),
              () => {
                if (i + 1 === files.length) {
                  if (!this.uploadUnsuccessful()) {
                    this.redirectToBasket();
                  }
                }
              }
            );
          } catch (e) {
            this.setState(prevState => ({
              percentage,
              uploadedFiles: [
                ...prevState.uploadedFiles,
                {
                  name: filename,
                  success: false,
                  message: e.response.data
                }
              ]
            }));
          }
          // make it possible to upload same files twice in a row
          if (i + 1 === files.length) {
            target.value = "";
          }
        }
      }
    );
  };

  render() {
    const {
      t,
      text = t("uploadAndPrintButton.link.defaultText"),
      className
    } = this.props;
    return (
      <Fragment>
        <Link
          to="#"
          className={`${className} pointer`}
          onClick={this.openModal}
        >
          {text}
        </Link>
        <Modal
          className="modal modal--large"
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Upload Modal"
        >
          <h2 className="m0 center py1 bg-navy text-white h4 favourite-font-weight">
            {t("uploadAndPrintButton.modal.title")}
          </h2>
          <div className="px3 flex flex-direction--column mt1 mb2">
            <span className="mb1">
              {t("uploadAndPrintButton.modal.acceptedFormat")}:{" "}
              {acceptedFormat.join(", ")}
            </span>
            <form>
              <input
                id="fileInput"
                type="file"
                multiple
                className="hide"
                onChange={this.onUpload}
              />
            </form>
            {this.state.isUploading ? (
              <div>
                <p className="text-navy m0 mb1 h4">
                  {t("uploadAndPrintButton.modal.progress", {
                    percent: this.state.percentage
                  })}
                </p>
                <Line
                  percent={this.state.percentage}
                  strokeWidth="4"
                  strokeColor="#9BD069"
                />
                <div
                  id="uploadedFiles"
                  className="mt1"
                  style={{ overflowY: "scroll", height: "200px" }}
                >
                  {this.state.uploadedFiles.map((uploadedFile, index) => (
                    <div className="flex flex-direction--column" key={index}>
                      <div className="flex align-items--center">
                        <div>
                          {uploadedFile.success ? (
                            <MdDone className="h4 text-christmas-tree" />
                          ) : (
                            <MdHighlightOff className="h4 text-leaf" />
                          )}
                        </div>
                        <div className="ml1">{uploadedFile.name}</div>
                      </div>
                      <span className="text-leaf">{uploadedFile.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Fragment>
                <a
                  onClick={this.triggerFileDialog}
                  className="button button--navy button--no-border-radius center"
                >
                  {t("uploadAndPrintButton.modal.uploadButton")}
                </a>
                <div className="flex justify-content--end mt1">
                  <a
                    className="button button-outline--navy button--no-border-radius"
                    onClick={this.closeModal}
                  >
                    {t("uploadAndPrintButton.modal.cancelButton")}
                  </a>
                </div>
              </Fragment>
            )}
            {this.uploadUnsuccessful() && this.state.percentage === 100 && (
              <div className="flex justify-content--between mt1">
                <a
                  onClick={this.triggerFileDialog}
                  className="button button-outline--navy"
                >
                  {t("uploadAndPrintButton.modal.tryAgain")}
                </a>
                <Link
                  className="button button--leaf"
                  onClick={this.redirectToBasket}
                  to="#"
                >
                  {t("uploadAndPrintButton.modal.continue")}{" "}
                  &rarr;
                </Link>
              </div>
            )}
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ order }) => ({
  order
});

const mapDispatchToProps = dispatch => ({
  addOrderItem: orderItem => dispatch(addOrderItem(orderItem))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withTranslation()(UploadAndPrintButton)));
