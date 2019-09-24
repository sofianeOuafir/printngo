import React from "react"
import Modal from 'react-modal'

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

  render () {
    return (
      <React.Fragment>
        <a onClick={this.openModal}>Upload & Print Now</a>
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
        <h2>Choose Files</h2>
        <button>Upload From Computer</button>
        <button onClick={this.closeModal}>close</button>
      </Modal>
      </React.Fragment>
    );
  }
}

export default UploadAndPrintButton
