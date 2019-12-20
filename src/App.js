import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import OpentokForm from './components/OpentokForm';
import ProjectReport from './components/ProjectReport';
import SessionReport from './components/SessionReport';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={OpentokForm} />
        <Route path="/project" component={ProjectReport} />
        <Route path="/session" component={SessionReport} />
      </div>
    </BrowserRouter>
  );
}

export default App;
