import React, { Component } from 'react';

class ChartContainer extends Component {
  render() {
    return (
      <div className="card m-3 scroll-element" id={ this.props.scrollId }>
        <div className="card-header font-weight-bold">
          <i className={`fas fa-chart-${this.props.titleIcon}`}></i> {
            this.props.title
          }
        </div>
        <div className="card-body w-95">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ChartContainer;
