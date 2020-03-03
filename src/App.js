import React, { Component } from "react";
import { Query } from "react-apollo";
import LaunchesList from "./components/LaunchesList";
import gql from "graphql-tag";

const launchesGQLQuery = gql`
  query launches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset, sort: "launch_date_local", order: "DESC") {
      id
      mission_name
      launch_date_local
      launch_success
      rocket {
        rocket_name
      }
      launch_site {
        site_name_long
      }
    }
  }
`;
class App extends Component {
  render() {
    return (
      <div>
        <h1 className="pb-5 text-center ">List of Launches</h1>
        <div className="my-3 text-right">
          <p>
            <span className="px-3 mr-2 bg-success" /> = Success
          </p>
          <p>
            <span className="px-3 mr-2 bg-danger" /> = Failed
          </p>
        </div>
        <Query query={launchesGQLQuery} variables={{ limit: 25, offset: 10 }}>
          {({ data, loading, error, fetchMore }) => {
            if (loading) return <p>Loading....</p>;
            if (error) return <p>{error.message}</p>;
            return (
              <LaunchesList
                launches={data.launches || []}
                onLoadMore={() =>
                  fetchMore({
                    variables: {
                      offset: data.launches.length,
                      limit: data.launches.length
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      return Object.assign({}, prevResult, {
                        launches: [...prevResult.launches, ...fetchMoreResult.launches]
                      });
                    }
                  })
                }
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
