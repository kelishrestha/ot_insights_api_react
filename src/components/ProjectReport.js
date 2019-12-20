import React from 'react';
import NavBar from './NavBar';

class ProjectReport extends React.Component {
  constructor(props) {
    super();
    this.state = {
      projectId: '46116222'
    }
  }

  render() {
    return (
      <div className="container-fluid p-0">
        <NavBar title="Project Dashboard" type="project" typeId={this.state.projectId}/>
      </div>
    );
  }
}

export default ProjectReport;
