import React, { Component } from 'react';
import '../css/loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    );
  }
}

export default Loading;
