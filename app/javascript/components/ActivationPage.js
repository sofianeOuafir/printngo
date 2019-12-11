import React from "react";
import axios from "axios";

class ActivationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      activation: {}
    };
  }
  
  componentDidMount() {
    const token = this.props.match.params.token;
    axios.get(`/api/v1/activations/${token}`).then(response => {
      console.log(response);
    });
  }

  render() {
    return <div>yo</div>;
  }
}

export default ActivationPage;
