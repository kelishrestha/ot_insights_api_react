import React from 'react';

class ShowId extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="ml-3">
        <div>
          <span className="text-uppercase">
            {this.props.type} ID
          </span>
          <h2>{this.props.typeId}</h2>
        </div>
        <div>
          <span className="text-uppercase">
            View Type
          </span>
          <h2 className="text-capitalize">{this.props.type} Level</h2>
        </div>
        <hr/>
      </div>
    );
  }
}

export default ShowId;
