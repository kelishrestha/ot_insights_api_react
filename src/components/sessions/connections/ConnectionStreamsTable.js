import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import Loading from '../../Loading';
import ErrorMessage from '../../ErrorMessage';

class ConnectionStreamsTable extends Component {
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
                  connections {
                    totalCount
                    maxConcurrent
                    resources {
                      guid
                      connectionId
                      publishers {
                        totalCount
                        resources {
                          connectionId
                          createdAt
                          destroyedAt
                          stream {
                            streamId
                            hasAudioTrack
                            hasVideoTrack
                            videoType
                          }
                          streamStatsCollection {
                            totalCount
                            resources {
                              createdAt
                              hasAudio
                              hasVideo
                            }
                          }
                          subscribers {
                            totalCount
                            resources {
                              subscriberId
                              connectionId
                              createdAt
                              destroyedAt
                              stream {
                                streamId
                                hasAudioTrack
                                hasVideoTrack
                                videoType
                              }
                              streamStatsCollection {
                                totalCount
                                resources {
                                  createdAt
                                  subscribeToAudio
                                  subscribeToVideo
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
          }
        }
        }
      }
    `;
    this.state = {
      query: query
    }
  }

  getSubscribedData(resources){
    let connectionData = []
    resources.forEach((connection, index) => {
      let connectionDetails = [];
      connectionDetails.push(index+1);
      connectionDetails.push(connection.connectionId);
      connectionDetails.push(get(connection, 'publishers.totalCount', 0));
      // const publisherArray = get(meeting, 'publishers.resources', []);
      // let streamStatsCount = 0;
      // let subscribersStatsCount = 0;
      // publisherArray.forEach(pubResources => {
      //   streamStatsCount += get(pubResources, 'streamStatsCollection.totalCount', 0);
      //   subscribersStatsCount += get(pubResources, 'subscribers.totalCount', 0);
      // });
      // connectionDetails['totalStreams'] = streamStatsCount;
      // connectionDetails['totalSubscribers'] = subscribersStatsCount;

      connectionData.push(connectionDetails);
    })
    // let distinctData = resources.filter(x => x.browser != null);
    // var chartData = {};
    // distinctData.forEach(function (obj) {
    //   var propName = obj.browser;
    //   chartData[propName] = chartData[propName] ? chartData[propName] + 1 : 1;
    // });
    return connectionData;
  }

  createTable = (connectionData) => {
    let table = []
    // Outer loop to create parent
    if (connectionData.length > 0){
      for (let i = 0; i < connectionData.length; i++) {
        let children = []
        //Inner loop to create children
        for (let j = 0; j < connectionData[i].length; j++) {
          children.push(<td key={`${j+1}`}>{`${connectionData[i][j]}`}</td>)
        }
        //Create the parent and add the children
        table.push(<tr key={`${i+1}`}>{children}</tr>)
      }
    }else{
      let children = []
      children.push(<td key="No values" colSpan="3" className="text-center">No connection data available from source.</td>);
      table.push(<tr key="No rows">{children}</tr>)
    }
    return table
  }

  render() {
    return (
      <Query query={this.state.query}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error.message} />;
          const resources = get(data, 'project.sessionData.sessions.resources', []);
          var connectionData = [];
          if (resources.length > 0){
            const meetingResources = resources.map(item => get(item, 'meetings.resources', []))[0];
            const connectionResources = meetingResources.map(item => get(item, 'connections.resources', []))[0];
            connectionData = this.getSubscribedData(connectionResources);
          }
          return (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Connection ID</th>
                  <th scope="col">Total Publishers</th>
                </tr>
              </thead>
              <tbody>
                {this.createTable(connectionData)}
              </tbody>
            </table>
          );
        }}
      </Query>
    );
  }
}

export default ConnectionStreamsTable;
