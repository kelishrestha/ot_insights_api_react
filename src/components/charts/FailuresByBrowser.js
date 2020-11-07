import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Bar } from 'react-chartjs-3';
import { get } from 'lodash';
import moment from 'moment';
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';

class FailuresByBrowser extends Component {
  constructor(props){
    super();
    const apiKey = props.projectId;
    const query = gql`
      {
        project(projectId: ${apiKey}) {
          projectData(
            start: ${moment().subtract(30, 'days')},
            groupBy: BROWSER,
            browser: [CHROME, FIREFOX, IE, EDGE, SAFARI]
          ) {
            resources {
              browser,
              errors {
                connect {
                  failures
                },
                publish {
                  failures
                },
                subscribe {
                  failures
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
            <Bar data={{
              labels: resources.map(item => item.browser),
              datasets: [
                {
                  label: 'Connect Failures',
                  backgroundColor: '#FF6384',
                  data: resources.map(item => get(item, 'errors.connect.failures', 0)),
                },
                {
                  label: 'Publish Failures',
                  backgroundColor: '#E89033',
                  data: resources.map(item => get(item, 'errors.publish.failures', 0)),
                },
                {
                  label: 'Subscribe Failures',
                  backgroundColor: '#FFCE56',
                  data: resources.map(item => get(item, 'errors.subscribe.failures', 0)),
                },
              ],
            }} />
          );
        }}
      </Query>
    );
  }
}

export default FailuresByBrowser;
