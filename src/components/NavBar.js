import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-info fixed-top">
        <span className="navbar-brand">{this.props.title}</span>
        <p className="lead mb-0">
          Project ID:&nbsp;
          <span className="font-weight-bold">{this.props.projectId}</span>
        </p>
        {this.props.type === 'session' &&
          <p className="lead mb-0">
            Session ID: &nbsp;
            <span className="font-weight-bold">{this.props.sessionId}</span>
          </p>
        }
        <form className="form-inline">
          <a className="btn btn-sm btn-outline-light" type="button" href="/">Go to HomePage</a>
        </form>
      </nav>
    );
  }
}

export default NavBar;
