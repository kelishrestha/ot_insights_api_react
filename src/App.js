import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import OpentokForm from './components/OpentokForm';
import ProjectReport from './components/ProjectReport';
import SessionReport from './components/SessionReport';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={OpentokForm} />
        <Route exact path="/ot_insights_api_react" component={OpentokForm} />
        <Route path="/project" component={ProjectReport} />
        <Route path="/session" component={SessionReport} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
