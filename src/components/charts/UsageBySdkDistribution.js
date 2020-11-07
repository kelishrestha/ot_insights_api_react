import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Pie } from 'react-chartjs-3';
import { get } from 'lodash';
import moment from 'moment';
import round from './helpers/round';
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';

class UsageBySdkDistribution extends Component {
  constructor(props){
    super();
    const apiKey = props.projectId;
    const query = gql`
      {
        project(projectId: ${apiKey}) {
          projectData(
            start: ${moment().subtract(30, 'days')},
            groupBy: SDK_TYPE,
            sdkType: [JS, ANDROID, IOS, WINDOWS, OTHER]
          ) {
            resources {
              sdkType,
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
    let distinctData = resources.filter(x => x.sdkType != null);
    var subscribedData = {};
    distinctData.forEach(item => {
      subscribedData[item.sdkType] = subscribedData[item.sdkType] || 0;
      subscribedData[item.sdkType] = round((subscribedData[item.sdkType] + item.usage.streamedSubscribedMinutes), 2);
    });
    // Compiling null data
    var otherSubscribedData = resources.filter(x => x.sdkType == null);;
    var otherData = otherSubscribedData.map(item => get(item, 'usage.streamedSubscribedMinutes', 0));
    let numOr0 = n => isNaN(n) ? 0 : n;
    var otherValues = otherData.reduce((a, b) => numOr0(a) + numOr0(b), 0)
    if (otherValues > 0){
      subscribedData['Unknown'] = otherValues
    }

    return {
      labels: Object.keys(subscribedData),
      subscribedData: Object.values(subscribedData)
    }
  }

  render() {
    return (
      <Query query={this.state.query}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <ErrorMessage error={error.message} />;
          const resources = get(data, 'project.projectData.resources', []);
          const {labels, subscribedData} = this.getSubscribedData(resources);
          return (
            <Pie data={{
              labels: labels,
              datasets: [{
                label: 'SDK Distributions',
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
                data: subscribedData,
              }],
            }} />
          );
        }}
      </Query>
    );
  }
}

export default UsageBySdkDistribution;
