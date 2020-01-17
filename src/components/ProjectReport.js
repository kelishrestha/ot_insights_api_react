import React from 'react';
import NavBar from './NavBar';
import { getToken, INSIGHTS_URL } from  './../util';
import urlJoin from 'url-join';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import ChartContainer from './../components/ChartContainer';
import UsageByDay from './../components/charts/UsageByDay';
import ProjectSideBar from './ProjectSideBar';

class ProjectReport extends React.Component {
  constructor(props) {
    super(props);
    const getProject = JSON.parse(localStorage.getItem('project'));
    // TODO: Redirect to home page when localstorage is deleted.
    // if (!getProject) {
    //   this.props.history.push('/');
    // }
    const {project_id, project_secret, query_type, session_id} = getProject;
    this.state = {
      projectId: project_id,
      projectSecret: project_secret,
      queryType: query_type,
      sessionId: session_id,
      client: ''
    }
  }

  componentDidMount(){
    const { projectId, projectSecret } = this.state;
    const token = getToken(projectId, projectSecret);
    const client = new ApolloClient({
      link: new HttpLink({
        uri: urlJoin(INSIGHTS_URL, '/graphql'),
        headers: { 'X-OPENTOK-AUTH': token },
      }),
      cache: new InMemoryCache(),
    });
    this.setState({ client })
  }

  render() {
    const { client, projectId } = this.state;
    if(client === ''){
      return null;
    }
    return (
      <ApolloProvider client={client}>
        <div className="container-fluid p-0">
          <NavBar title="Project Dashboard" type="project" typeId={projectId}/>
          <div className="row">
            <div className="col">
              <div data-spy="scroll" data-target="#navbar-example3" data-offset="0">
                <ChartContainer titleIcon="area" title="Usage by Day" scrollId="usage-by-day">
                  <UsageByDay projectId={projectId}/>
                </ChartContainer>

                <ChartContainer titleIcon="area" title="Usage by Day" scrollId="usage-by-location">
                  <UsageByDay projectId={projectId}/>
                </ChartContainer>
              </div>
            </div>
            <div className="col-2">
              <ProjectSideBar />
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default ProjectReport;
