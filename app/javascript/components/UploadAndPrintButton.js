import React, { Fragment } from "react"
import Modal from 'react-modal'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';

import { addOrderItem } from './../actions/orderItems'; 

class UploadAndPrintButton extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      isUploading: false,
      percentage: 0,
      uploadedFile: ''
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
    const { order, addOrderItem, history } = this.props;
    const numberOfItemsBeforeUpload = order.number_of_items;
    this.setState(() => ({ isUploading: true }), () => {
      for(var i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        axios.post('/api/v1/orders/undefined/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          const orderItem = response.data;
          const { order, document } = orderItem;
          const numberOfItems = order.number_of_items;
          const percentage = Math.round((numberOfItems - numberOfItemsBeforeUpload) / files.length * 100);
          addOrderItem(orderItem)
          this.setState({ percentage, uploadedFile: document.name })
          if(numberOfItems === numberOfItemsBeforeUpload + files.length) {
            this.closeModal();
            history.push('/order/basket');
            this.setState(() => ({ isUploading: false, percentage: 0, uploadedFile: '' }));
          }
        })
      }
    })
  }

  render () {
    const { text = "Upload & Print Now", className } = this.props;
    return (
      <Fragment>
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
            { this.state.isUploading ? (
              <div> 
                <p className="text-navy h4">Progress: { this.state.percentage }%</p>
                <Line percent={this.state.percentage} strokeWidth="4" strokeColor="#FF757C" />
                { this.state.uploadedFile && <p> { this.state.uploadedFile }</p>}
              </div>
            ) : (
              <a onClick={this.triggerFileDialog} className="button button--navy button--no-border-radius center">Upload From Computer</a>
            ) }
            <div className="flex justify-content--end mt1">
              <a className="button button-outline--navy button--no-border-radius" onClick={this.closeModal}>Cancel</a>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ order }) => ({
  order
})

const mapDispatchToProps = (dispatch) => ({
  addOrderItem: (orderItem) => dispatch(addOrderItem(orderItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UploadAndPrintButton));
