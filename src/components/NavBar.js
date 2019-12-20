import React from 'react';
import ShowId from './ShowId';

class NavBar extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-info">
        <span className="navbar-brand">{this.props.title}</span>
        <ShowId type={this.props.type} typeId={this.props.typeId} />

        <form className="form-inline">
          <button className="btn btn-sm btn-outline-light" type="button">Go to HomePage</button>
        </form>
      </nav>
    );
  }
}

export default NavBar;
