import React from 'react';
import ShowId from './ShowId';

class ProjectSideBar extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav id="navbar-example3" className="navbar navbar-light bg-light position-fixed h-100">
        <nav className="nav nav-pills flex-column">
          <ShowId type={this.props.type} typeId={this.props.typeId} />
          <a className="nav-link font-weight-bold" href="#usage">Usage</a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link ml-3 my-1" href="#usage-by-day">By Day</a>
            <a className="nav-link ml-3 my-1" href="#usage-by-location">By Location</a>
            <a className="nav-link ml-3 my-1" href="#usage-by-browser">By Browser</a>
            <a className="nav-link ml-3 my-1" href="#usage-by-browser-version">By Browser Version</a>
            <a className="nav-link ml-3 my-1" href="#usage-by-sdk-version">By SDK Version</a>
            <a className="nav-link ml-3 my-1" href="#usage-by-sdk-distribution">By SDK Distribution</a>
          </nav>
          <a className="nav-link font-weight-bold" href="#quality-and-failures">Quality and Failures</a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link ml-3 my-1" href="#failures-by-browser">Failures by browser</a>
            <a className="nav-link ml-3 my-1" href="#failures-by-sdktype">Failures by SDK Type</a>
          </nav>
          <a className="nav-link font-weight-bold" href="#speed">Speed</a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link ml-3 my-1" href="#latency-by-country">Latency By Country</a>
            <a className="nav-link ml-3 my-1" href="#bitrate-by-country">Bitrate by Country</a>
          </nav>
        </nav>
      </nav>
    );
  }
}

export default ProjectSideBar;
