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
import SubscriberVideoBitRateStats from './sessions/subscribers/SubscriberVideoBitRateStats';
import SubscriberVideoPacketLossStats from './sessions/subscribers/SubscriberVideoPacketLossStats';
import SubscriberVideoLatencyStats from './sessions/subscribers/SubscriberVideoLatencyStats';
import PublisherAudioBitRateStats from './sessions/publishers/PublisherAudioBitRateStats';
import PublisherAudioPacketLossStats from './sessions/publishers/PublisherAudioPacketLossStats';
import PublisherAudioLatencyStats from './sessions/publishers/PublisherAudioLatencyStats';
import SubscriberAudioBitRateStats from './sessions/subscribers/SubscriberAudioBitRateStats';
import SubscriberAudioPacketLossStats from './sessions/subscribers/SubscriberAudioPacketLossStats';
import SubscriberAudioLatencyStats from './sessions/subscribers/SubscriberAudioLatencyStats';
import ConnectionStreamsTable from './sessions/connections/ConnectionStreamsTable';

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
                  <ChartContainer titleIcon="area" title="Publisher Video Bitrate Stats" scrollId="publisher-stats-by-video-bitrate">
                    <PublisherVideoBitRateStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Publisher Video Packet Loss Stats" scrollId="publisher-stats-by-video-packet-loss">
                    <PublisherVideoPacketLossStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Publisher Video Latency Stats" scrollId="publisher-stats-by-video-latency">
                    <PublisherVideoLatencyStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Publisher Audio Bitrate Stats" scrollId="publisher-stats-by-audio-bitrate">
                    <PublisherAudioBitRateStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Publisher Audio Packet Loss Stats" scrollId="publisher-stats-by-audio-packet-loss">
                    <PublisherAudioPacketLossStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Publisher Audio Latency Stats" scrollId="publisher-stats-by-audio-latency">
                    <PublisherAudioLatencyStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                </div>
                <div id="subscriber-stats">
                  <ChartContainer titleIcon="area" title="Subscriber Video Bitrate Stats" scrollId="subscriber-stats-by-video-bitrate">
                    <SubscriberVideoBitRateStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Subscriber Video Packet Loss Stats" scrollId="subscriber-stats-by-video-packet-loss">
                    <SubscriberVideoPacketLossStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Subscriber Video Latency Stats" scrollId="subscriber-stats-by-video-latency">
                    <SubscriberVideoLatencyStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>

                  <ChartContainer titleIcon="area" title="Subscriber Audio Bitrate Stats" scrollId="subscriber-stats-by-audio-bitrate">
                    <SubscriberAudioBitRateStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Subscriber Audio Packet Loss Stats" scrollId="subscriber-stats-by-audio-packet-loss">
                    <SubscriberAudioPacketLossStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                  <ChartContainer titleIcon="area" title="Subscriber Audio Latency Stats" scrollId="subscriber-stats-by-audio-latency">
                    <SubscriberAudioLatencyStats projectId={projectId} sessionId={sessionId} />
                  </ChartContainer>
                </div>
                <div id="connection-details" className="m-3">
                  <h2 className="text-capitalize">Connections Stats</h2>
                  <ConnectionStreamsTable projectId={projectId} sessionId={sessionId} scrollId="connection-stats"/>
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
