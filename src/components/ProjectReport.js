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
import UsageByLocation from './../components/charts/UsageByLocation';
import UsageByBrowser from './../components/charts/UsageByBrowser';
import UsageByBrowserVersion from './../components/charts/UsageByBrowserVersion';
import UsageBySdkVersion from './../components/charts/UsageBySdkVersion';
import UsageBySdkDistribution from './../components/charts/UsageBySdkDistribution';
import LatencyByCountry from './../components/charts/LatencyByCountry';
import FailuresBySdkType from './../components/charts/FailuresBySdkType';
import ProjectSideBar from './ProjectSideBar';
import FailuresByBrowser from './charts/FailuresByBrowser';
import BitrateByCountry from './charts/BitrateByCountry';

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
          <NavBar title="Project Dashboard" type="project" projectId={projectId}/>
          <div className="row my-5 mx-0 header-spacer">
            <div className="col-2 p-0">
              <ProjectSideBar type="project" typeId={projectId}/>
            </div>
            <div className="col pr-0">
              <div data-spy="scroll" data-target="#navbar-example3" data-offset="0">
                <div id="usage">
                  <ChartContainer titleIcon="area" title="Usage by Day" scrollId="usage-by-day">
                    <UsageByDay projectId={projectId}/>
                  </ChartContainer>

                  <ChartContainer titleIcon="area" title="Usage by Location" scrollId="usage-by-location">
                    <UsageByLocation projectId={projectId}/>
                  </ChartContainer>

                  <ChartContainer titleIcon="area" title="Usage by Browser" scrollId="usage-by-browser">
                    <UsageByBrowser projectId={projectId}/>
                  </ChartContainer>

                  <ChartContainer titleIcon="area" title="Usage by Browser Version" scrollId="usage-by-browser-version">
                    <UsageByBrowserVersion projectId={projectId}/>
                  </ChartContainer>

                  <ChartContainer titleIcon="area" title="Usage by SDK Version" scrollId="usage-by-sdk-version">
                    <UsageBySdkVersion projectId={projectId}/>
                  </ChartContainer>

                  <ChartContainer titleIcon="area" title="Usage by SDK Distribution" scrollId="usage-by-sdk-distribution">
                    <UsageBySdkDistribution projectId={projectId}/>
                  </ChartContainer>
                </div>
                <div id="quality-and-failures">
                  <ChartContainer titleIcon="area" title="Failures by SDK Type" scrollId="failures-by-sdktype">
                    <FailuresBySdkType projectId={projectId}/>
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Failures by Browser" scrollId="failures-by-browser">
                    <FailuresByBrowser projectId={projectId}/>
                  </ChartContainer>
                </div>
                <div id="speed">
                  <ChartContainer titleIcon="area" title="Latency By Country" scrollId="latency-by-country">
                    <LatencyByCountry projectId={projectId}/>
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Bitrate By Country" scrollId="bitrate-by-country">
                    <BitrateByCountry projectId={projectId}/>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default ProjectReport;
