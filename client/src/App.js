import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";

import Register from "./components/Register";
import ResetDatabase from "./components/ResetDatabase";
import Login from "./components/Login";
import Page from "./components/Page";
import MainBody from "./components/MainBody";
import AddData from "./components/AddData";
import EditCar from "./components/EditCar";
import DeleteCar from "./components/DeleteCar";
import DisplayAllCars from "./components/DisplayAllCars";
import LoggedInRoute from "./components/LoggedInRoute";

import { ACCESS_LEVEL_GUEST } from "./config/global_constants";

if (typeof localStorage.accessLevel === "undefined") {
  localStorage.name = "GUEST";
  localStorage.accessLevel = ACCESS_LEVEL_GUEST;
  localStorage.token = null;
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          
          <Route exact path="/" component={Page} />
          
          
        </Switch>
      </BrowserRouter>
    );
  }
}
