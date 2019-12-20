import React from 'react';

class ShowId extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <span className="text-uppercase">{this.props.type} ID: {this.props.typeId}</span>
    );
  }
}

export default ShowId;
