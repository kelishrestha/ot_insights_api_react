import React from 'react';

class ProjectSideBar extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav id="navbar-example3" className="navbar navbar-light bg-light position-fixed">
        <nav className="nav nav-pills flex-column">
          <a className="nav-link font-weight-bold" href="#usage">Usage</a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link ml-3 my-1" href="#usage-by-day">Usage By Day</a>
            <a className="nav-link ml-3 my-1" href="#usage-by-location">Usage By Location</a>
          </nav>
          <a className="nav-link" href="#item-2">Item 2</a>
          <a className="nav-link" href="#item-3">Item 3</a>
          <nav className="nav nav-pills flex-column">
            <a className="nav-link ml-3 my-1" href="#item-3-1">Item 3-1</a>
            <a className="nav-link ml-3 my-1" href="#item-3-2">Item 3-2</a>
          </nav>
        </nav>
      </nav>
    );
  }
}

export default ProjectSideBar;
