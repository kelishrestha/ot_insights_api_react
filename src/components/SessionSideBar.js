import React from 'react';

class SessionSideBar extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav id="navbar-example3" className="navbar navbar-light bg-light position-fixed h-100">
        <nav className="nav nav-pills flex-column">
          <a className="nav-link font-weight-bold" href="#totalUnits">Total Units</a>
          <a className="nav-link font-weight-bold" href="#stats">Statistics</a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link ml-3" href="#stats-by-browser">By Browser</a>
            <a className="nav-link ml-3" href="#stats-by-location">By Location</a>
            <a className="nav-link ml-3" href="#stats-by-browser-version">By Browser Version</a>
            <a className="nav-link ml-3" href="#stats-by-sdk-version">By SDK Version</a>
            <a className="nav-link ml-3" href="#stats-by-sdk-distribution">By SDK Distribution</a>
          </nav>
          <a className="nav-link font-weight-bold" href="#publisher-stats">Publisher Details</a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link ml-3" href="#publisher-stats-by-streams">Video Bitrate Stats</a>
            <a className="nav-link ml-3" href="#publisher-stats-by-packet-loss">Video Packet Loss Stats</a>
            <a className="nav-link ml-3" href="#publisher-stats-by-latency">Video Latency Stats</a>
          </nav>
          <a className="nav-link font-weight-bold" href="#subscriber-stats">Subscriber Details</a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link ml-3" href="#subscriber-stats-by-streams">Video Bitrate Stats</a>
            <a className="nav-link ml-3" href="#subscriber-stats-by-packet-loss">Video Packet Loss Stats</a>
            <a className="nav-link ml-3" href="#subscriber-stats-by-latency">Video Latency Stats</a>
          </nav>
        </nav>
      </nav>
    );
  }
}

export default SessionSideBar;
