import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Line } from 'react-chartjs-3';
import { get } from 'lodash';
import Loading from '../../Loading';
import ErrorMessage from '../../ErrorMessage';
import EmptyGraph from '../../EmptyGraph';

class PublisherVideoBitRateStats extends Component {
  constructor(props){
    super();
    const apiKey = props.projectId;
    const sessionId = `"${props.sessionId}"`;
    const query = gql`
      {
        project(projectId: ${apiKey}) {
        sessionData {
          sessions(sessionIds: [${sessionId}]) {
            resources {
              meetings {
                resources {
                  publishers {
                    totalCount
                    resources {
                      stream {
                        streamId
                      }
                      streamStatsCollection {
                        resources {
                          videoBitrateKbps
                          videoResolution
                          createdAt
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        }
      }
    `;
    this.state = {
      query: query
    }
  }

  getSubscribedData(meetingArray){
    let meetingWithMostStats = {};
    let largestStatsCount = 0;
    meetingArray.forEach(meeting => {
      let statsCount = 0;
      const publisherArray = get(meeting, 'publishers.resources', []);
      publisherArray.forEach(pubResources => {
        statsCount += get(pubResources, 'streamStatsCollection.resources.length', 0);
      });
      if (statsCount > largestStatsCount) {
        meetingWithMostStats = meeting;
        largestStatsCount = statsCount;
      }
    });
    var streamChartData = this.convertStreamArrayToChartData(meetingWithMostStats);
    return streamChartData;
  }

  convertStreamArrayToChartData = (meeting) => {
    const colors = ['#66C5CC', '#F6CF71', '#F89C74', '#DCB0F2', '#87C55F',
      '#9EB9F3', '#FE88B1', '#C9DB74', '#8BE0A4', '#B497E7', '#D3B484', '#B3B3B3'];
    let colorIndex = 0;
    const publisherArray = get(meeting, 'publishers.resources', []);
    const chartData = publisherArray.reduce((acc, streamData) => {
      const streamStatsArray = get(streamData, 'streamStatsCollection.resources', []);
      // Discard short publishers
      if (streamStatsArray.length < 3) {
        return acc;
      }
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      const shortStreamId = streamData.stream.streamId.substring(0, 8);
      const chartData = {
        borderColor: color,
        fill: false,
        label: `Stream ${shortStreamId}...`,
        data: streamStatsArray.reduce((acc, streamStats) => {
            // Discard stats anomolously large bitrates
            if (streamStats.videoBitrateKbps > 1000) {
              return acc;
            }
            return acc.concat({
              x: streamStats.createdAt,
              y: streamStats.videoBitrateKbps,
            })
          }, []),
      };

      return acc.concat(chartData)
    }, []);
    return chartData;
  }

  render() {
    return (
      <Query query={this.state.query}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error.message} />;
          const resources = get(data, 'project.sessionData.sessions.resources', []);
          let graph;
          if (resources.length > 0){
            const meetingResources = resources.map(item => get(item, 'meetings.resources', []))[0];
            const streamChartData = this.getSubscribedData(meetingResources);
            graph = <Line
              data={{
                datasets: streamChartData
              }}
              options={{
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'kbps'
                    }
                  }],
                  xAxes: [{
                    type: 'time',
                    distribution: 'linear',
                    time: {
                      unit: 'minute',
                      displayFormats: {
                        minute: 'MMM D, hh:mm:ss'
                      }
                    },
                  }]
                }}
              }
            />

          }else{
            graph = <EmptyGraph />;
          }

          return graph;
        }}
      </Query>
    );
  }
}

export default PublisherVideoBitRateStats;
