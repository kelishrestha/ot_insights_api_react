import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/">{this.props.title}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Go To Home</a>
            </li>
          </ul>
          <span className="navbar-text d-inline-flex">
            <p className="lead mb-0">
              Project ID:&nbsp;
              <span className="font-weight-bold">{this.props.projectId}</span>
            </p>
            {this.props.type === 'session' &&
              <p className="lead mb-0">
                &nbsp; Session ID: &nbsp;
                <span className="font-weight-bold">{this.props.sessionId}</span>
              </p>
            }
          </span>
        </div>
      </nav>
    );
  }
}

export default NavBar;
