import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  HomePage,
  PptGenerator,
  Highlighter,
  Summarizer,
  QuestionGenerator,
  QuestionAnswer,
} from "../Components/MainPages/index";
import Dashboard from "../Components/MainPages/Dashboard/Dashboard";
import { Login, Register } from "../Components/Authentication/index";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/ppt-generator" component={PptGenerator} />
      <Route exact path="/highlighter" component={Highlighter} />
      <Route exact path="/summarizer" component={Summarizer} />
      <Route exact path="/question-answer" component={QuestionAnswer} />
      <Route exact path="/question-generator" component={QuestionGenerator} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
}

export default Routes;
