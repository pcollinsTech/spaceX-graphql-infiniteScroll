import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Launch from "./components/Launch";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./images/logo.png";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div className="container">
        <img src={logo} alt="SpaceX" style={{ width: 300, display: "block", margin: "auto" }} />
        <Route exact path="/" component={App} />
        <Route exact path="/launch/:id" component={Launch} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
