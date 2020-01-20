import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import round from './../charts/helpers/round';
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';

class StreamStats extends Component {
  constructor(props){
    super();
    const apiKey = props.projectId;
    const sessionId = `"${props.sessionId}"`;
    const query = gql`
      {
        project(projectId: ${apiKey}) {
        sessionData {
          sessions(sessionIds: [${sessionId}]) {
            totalCount
            resources {
              publisherMinutes
              subscriberMinutes
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

  render() {
    return (
      <Query query={this.state.query}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error.message} />;
          const resources = get(data, 'project.sessionData.sessions.resources', []);
          const publisherMinutes = resources.map(item => get(item, 'publisherMinutes', 0))
          const subscriberMinutes = resources.map(item => get(item, 'subscriberMinutes', 0))
          return (
            <div className="card-deck m-0">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Published Minutes</h5>
                  <h1>
                    {(round(publisherMinutes, 2).toString()=== 'NaN' ? 'N/A' :round(publisherMinutes, 2))}
                  </h1>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Subscribed Minutes</h5>
                  <h1>
                    {(round(subscriberMinutes, 2).toString()=== 'NaN' ? 'N/A' :round(subscriberMinutes, 2))}
                  </h1>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default StreamStats;
