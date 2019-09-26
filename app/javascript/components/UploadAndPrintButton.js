import React from "react"
import Modal from 'react-modal'
import axios from 'axios';

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
      })
    }

    // var imagefile = document.querySelector('#file');
    // formData.append("file", imagefile.files);
    // axios.post('upload_file', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    // })

  }

  render () {
    return (
      <React.Fragment>
        <a className="pointer" onClick={this.openModal}>Upload & Print Now</a>
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

export default UploadAndPrintButton
