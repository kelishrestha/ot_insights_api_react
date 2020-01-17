import React from 'react';
import logo from './../logo.svg';

class OpentokForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeQueryType = this.changeQueryType.bind(this);
    this.state = {
      queryType: 'project',
      sessionIdDisable: true
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var formData = Array.prototype.slice.call(event.target).filter(el => el.name).reduce((form, el) => ({...form,[el.name]: el.value,}), {})
    if(formData['query_type'] === 'project'){
      // Submit to ProjectReport
      localStorage.setItem('project', JSON.stringify(formData))
      this.props.history.push("/project")
    }else{
      // Submit to SessionReport`
      localStorage.setItem('session', JSON.stringify(formData))
      this.props.history.push("/session")
    }
  }

  changeQueryType(event) {
    var queryType = event.target.value;
    this.setState({ queryType: queryType });
    var disableState = (queryType === 'session') ? false : true;
    this.setState({ sessionIdDisable: disableState });
  }

  render() {
    return (
      <div className="container h-100">
        <div className="row align-items-center h-100 my-5 py-5">
          <div className="col-6 mx-auto">
            <div className="jumbotron bg-light py-4">
              <h3 className="text-center">
                <img src={logo} className="w-25" alt="logo" />
                <br/>
                Opentok Insights API Graph
              </h3>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="project_id">Project ID</label>
                  <input id="project_id" name="project_id" type="text" className="form-control" placeholder="Project ID" required />
                </div>
                <div className="form-group">
                  <label htmlFor="project_secret">Project Secret</label>
                  <input id="project_secret" name="project_secret" type="text" className="form-control" placeholder="Project Secret" required />
                </div>
                <div className="form-group">
                  <label htmlFor="query_type">Query Type</label>
                  <select className="custom-select" onChange={this.changeQueryType.bind(this)} value={this.state.queryType} name="query_type" required >
                    <option value="project" defaultValue>Project Level</option>
                    <option value="session">Session Level</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="session_id">Session ID</label>
                  <input id="session_id" name="session_id" type="text" className="form-control" placeholder="Tokbox Session ID" disabled={this.state.sessionIdDisable} />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary text-uppercase">View Stats</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OpentokForm;
