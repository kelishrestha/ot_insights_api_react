import React from 'react';
import NavBar from './NavBar';
import { getToken, INSIGHTS_URL } from  './../util';
import urlJoin from 'url-join';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import SessionSideBar from './SessionSideBar';
import StreamStats from './sessions/StreamStats';
import PublisherVideoBitRateStats from './sessions/publishers/PublisherVideoBitRateStats';
import BrowserStats from './sessions/BrowserStats';
import BrowserVersionStats from './sessions/BrowserVersionStats';
import ChartContainer from './ChartContainer';
import CountryStats from './sessions/CountryStats';
import SdkTypeStats from './sessions/SdkTypeStats';
import SdkVersionStats from './sessions/SdkVersionStats';
import PublisherVideoPacketLossStats from './sessions/publishers/PublisherVideoPacketLossStats';
import PublisherVideoLatencyStats from './sessions/publishers/PublisherVideoLatencyStats';

class SessionReport extends React.Component {
  constructor(props) {
    super(props);
    const getProject = JSON.parse(localStorage.getItem('session'));
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
    const { client, projectId, sessionId } = this.state;
    if(client === ''){
      return null;
    }
    return (
      <ApolloProvider client={client}>
        <div className="container-fluid p-0">
          <NavBar title="Session Dashboard" type="session" projectId={projectId} sessionId={sessionId} />
          <div className="row my-5 mx-0 header-spacer">
            <div className="col-2 p-0">
              <SessionSideBar type="session" projectId={projectId} sessionId={sessionId}/>
            </div>
            <div className="col-10 pr-0">
              <div data-spy="scroll" data-target="#navbar-example3" data-offset="0">
                <div id="totalUnits">
                  <h2 className="text-capitalize">Total Units</h2>
                  <StreamStats projectId={projectId} sessionId={sessionId}/>
                </div>
                <div id="quality-stats">
                  <ChartContainer titleIcon="area" title="Browser Stats" scrollId="stats-by-browser">
                    <BrowserStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Browser Version Stats" scrollId="stats-by-browser-version">
                    <BrowserVersionStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Country Stats" scrollId="stats-by-location">
                    <CountryStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="SDK Type Stats" scrollId="stats-by-sdk-distribution">
                    <SdkTypeStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="SDK Version Stats" scrollId="stats-by-sdk-version">
                    <SdkVersionStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                </div>
                <div id="publisher-stats">
                  <ChartContainer titleIcon="area" title="Video Bitrate Stats" scrollId="publisher-stats-by-streams">
                    <PublisherVideoBitRateStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Video Packet Loss Stats" scrollId="publisher-stats-by-packet-loss">
                    <PublisherVideoPacketLossStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Video Latency Stats" scrollId="publisher-stats-by-latency">
                    <PublisherVideoLatencyStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                </div>
                <div id="speed">
                </div>
              </div>
            </div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default SessionReport;
