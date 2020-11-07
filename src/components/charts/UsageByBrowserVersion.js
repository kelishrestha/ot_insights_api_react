import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Pie } from 'react-chartjs-3';
import { get } from 'lodash';
import moment from 'moment';
import round from './helpers/round';
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';

class UsageByBrowserVersion extends Component {
  constructor(props){
    super();
    const apiKey = props.projectId;
    const query = gql`
      {
        project(projectId: ${apiKey}) {
          projectData(
            start: ${moment().subtract(30, 'days')},
            interval: DAILY,
            groupBy: BROWSER_VERSION
          ) {
            resources {
              browserVersion
              browser
              usage {
                streamedSubscribedMinutes
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
    let distinctBrowsers = resources.filter(x => x.browserVersion != null);
    var browserData = {};
    distinctBrowsers.forEach(item => {
      var propName = item.browser + item.browserVersion;
      browserData[propName] = browserData[propName] || 0;
      var subscribedMinutes = item.usage == null ? 0 : item.usage.streamedSubscribedMinutes;
      browserData[propName] = round((browserData[propName] + subscribedMinutes), 2);
    });
    // Compiling null data
    var otherBrowsersData = resources.filter(x => x.browserVersion == null);;
    var otherData = otherBrowsersData.map(item => get(item, 'usage.streamedSubscribedMinutes', 0));
    let numOr0 = n => isNaN(n) ? 0 : n;
    var otherValues = otherData.reduce((a, b) => numOr0(a) + numOr0(b), 0)
    if (otherValues > 0){
      browserData['Others'] = otherValues
    }

    return {
      labels: Object.keys(browserData),
      browserData: Object.values(browserData)
    }
  }

  render() {
    return (
      <Query query={this.state.query}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error.message} />;
          const resources = get(data, 'project.projectData.resources', []);
          const {labels, browserData} = this.getSubscribedData(resources);
          return (
            <Pie data={{
              labels: labels,
              datasets: [{
                data: browserData,
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

export default UsageByBrowserVersion;
