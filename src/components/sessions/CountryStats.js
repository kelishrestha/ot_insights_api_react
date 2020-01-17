import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Pie } from 'react-chartjs-3';
import { get } from 'lodash';
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';

class CountryStats extends Component {
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
                      country
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
    let distinctData = resources.filter(x => x.country != null);
    var chartData = {};
    distinctData.forEach(function (obj) {
      var propName = obj.country;
      chartData[propName] = chartData[propName] ? chartData[propName] + 1 : 1;
    });
    return {
      labels: Object.keys(chartData),
      chartData: Object.values(chartData)
    }
  }

  render() {
    return (
      <Query query={this.state.query}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error.message} />;
          const resources = get(data, 'project.sessionData.sessions.resources', []);
          const meetingResources = resources.map(item => get(item, 'meetings.resources', []))[0];
          const connectionResources = meetingResources.map(item => get(item, 'connections.resources', []))[0];
          const {labels, chartData} = this.getSubscribedData(connectionResources);

          return (
            <Pie data={{
              labels: labels,
              datasets: [{
                data: chartData,
                backgroundColor: [
                  '#e6194b',
                  '#3cb44b',
                  '#ffe119',
                  '#4363d8',
                  '#f58231',
                  '#911eb4',
                  '#46f0f0',
                  '#f032e6',
                  '#bcf60c',
                  '#fabebe',
                  '#008080',
                  '#e6beff',
                  '#9a6324',
                  '#fffac8',
                  '#800000',
                  '#aaffc3',
                  '#808000',
                  '#ffd8b1',
                  '#000075',
                  '#808080'
                ],
              }],
            }} />
          );
        }}
      </Query>
    );
  }
}

export default CountryStats;
