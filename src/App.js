import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout"; 
import Login from "./Login"; 
import Home from "./Home";  
// TODO:: add home page

class App extends Component {
  render() {
    let routes = (
      <Switch> 
        <Route path="/" exact component={Login} />
        <Route exact path="/Home" component={Home} />
      </Switch>
    );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

export default withRouter(connect(null)(App));
