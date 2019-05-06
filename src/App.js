import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Home from "./components/containers/Home";
import Course from "./components/containers/Course";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/course" exact component={Course} />
        </div>
      </Router>
    );
  }
}

export default App;
