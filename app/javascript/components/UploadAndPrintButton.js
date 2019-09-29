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
      axios.post('api/v1/orders/undefined/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response);
        this.props.addOrderItem(response.data)
        console.log(response);
        this.closeModal();
        this.props.history.push('/basket')
      })
    }
  }

  render () {
    const { text = "Upload & Print Now", className } = this.props;
    return (
      <React.Fragment>
        <a className={`${className} pointer`} onClick={this.openModal}>{text}</a>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <h2>Choose Files</h2>
          <form>
            <input
              type="file"
              multiple
              onChange={this.onUpload}
            />
          </form>

          <button>Upload From Computer</button>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addOrderItem: (orderItem) => dispatch(addOrderItem(orderItem))
})

export default connect(null, mapDispatchToProps)(withRouter(UploadAndPrintButton));
