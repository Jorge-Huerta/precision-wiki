import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from "./components/containers/Menu";
import Course from "./components/containers/Course";
import Upload from "./components/containers/upload/Upload";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
            <Switch>
              <Route exact path="/" exact component={Course} />
              <Route path="/upload" exact component={Upload} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
