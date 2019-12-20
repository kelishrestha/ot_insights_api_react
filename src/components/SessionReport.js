import React from 'react';
import NavBar from './NavBar';

class SessionReport extends React.Component {
  constructor(props) {
    super();
    this.state = {
      projectId: '46116222',
      sessionId: props.sessionId
    }
  }

  render() {
    return (
      <div className="container-fluid p-0">
        <NavBar title="Session Dashboard" type="session" typeId={this.state.sessionId}/>
      </div>
    );
  }
}

export default SessionReport;
