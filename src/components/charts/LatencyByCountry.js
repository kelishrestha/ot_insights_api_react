import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { HorizontalBar } from 'react-chartjs-3';
import { get } from 'lodash';
import moment from 'moment';
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';

class LatencyByCountry extends Component {
  constructor(props){
    super();
    const apiKey = props.projectId;
    const query = gql`
      {
        project(projectId: ${apiKey}) {
          projectData(
            start: ${moment().subtract(30, 'days')},
            groupBy: COUNTRY
          ) {
            resources {
              country,
              quality {
                subscriber {
                  latencyMsAvg
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

  render() {
    return (
      <Query query={this.state.query}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error.message} />;
          const resources = get(data, 'project.projectData.resources', []);
          return (
            <HorizontalBar data={{
              labels: resources.map(item => item.country),
              datasets: [{
                label: 'Avg. latency',
                backgroundColor: '#36A2EB',
                data: resources.map(item => get(item, 'quality.subscriber.latencyMsAvg', 0)),
              }],
            }} />
          );
        }}
      </Query>
    );
  }
}

export default LatencyByCountry;
