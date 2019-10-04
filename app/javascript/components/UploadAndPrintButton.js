import React from "react"
import Modal from 'react-modal'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addOrderItem } from './../actions/orderItems'; 

class UploadAndPrintButton extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }

  triggerFileDialog = () => {
    document.getElementById("fileInput").click();
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  onUpload = (e) => {
    const files = e.target.files;
    for(var i = 0; i < files.length; i++) {
      const file = files[i];
      var formData = new FormData();
      formData.append("file", file);
      axios.post('/api/v1/orders/undefined/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        this.props.addOrderItem(response.data)
        this.closeModal();
        this.props.history.push('/order/basket')
      })
    }
  }

  render () {
    const { text = "Upload & Print Now", className } = this.props;
    return (
      <React.Fragment>
        <a className={`${className} pointer`} onClick={this.openModal}>{text}</a>
        <Modal
          className="modal modal--large"
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Upload Modal"
        >
          <h2 className="m0 center py1 bg-navy text-white h4 favourite-font-weight">Choose Files</h2>
          <div className="px3 flex flex-direction--column my2">
            <form>
              <input
                id="fileInput"
                type="file"
                multiple
                className="hide"
                onChange={this.onUpload}
              />
            </form>
            <a onClick={this.triggerFileDialog} className="button button--navy button--no-border-radius center">Upload From Computer</a>
            <div className="flex justify-content--end mt1">
              <a className="button button-outline--navy button--no-border-radius" onClick={this.closeModal}>Cancel</a>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addOrderItem: (orderItem) => dispatch(addOrderItem(orderItem))
})

export default connect(null, mapDispatchToProps)(withRouter(UploadAndPrintButton));
