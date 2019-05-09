import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Menu from "./components/containers/Menu";
import Course from "./components/containers/Course";
import Upload from "./components/containers/upload/Upload";
import Auth from "./components/containers/Auth/Auth"
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
            <Switch>
              <Route path="/course" exact component={Course} />
              <Route path="/upload" exact component={Upload} />
              <Route path="/auth" exact component={Auth} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
