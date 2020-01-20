import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Chart } from "react-google-charts";
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
    return Object.entries(chartData)
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
          const labels = ['Country', 'No. of Connections'];
          var countryData = [labels];
          const chartData = this.getSubscribedData(connectionResources);
          countryData = countryData.concat(chartData);
          return (
            <Chart
            chartType="GeoChart"
            data={countryData}
            width="100%"
            height="400px"
            legendToggle
          />
          );
        }}
      </Query>
    );
  }
}

export default CountryStats;
