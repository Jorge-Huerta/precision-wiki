import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Layout from "./components/functionals/layout/Layout";
import Course from "./components/containers/course/Course";
import Upload from "./components/containers/upload/Upload";
import Auth from "./components/containers/Auth/Auth";
import "./App.css";
import CourseData from "./components/test/CourseData";
import shortid from "shortid";

const dynamicRouting = courses => {
  return courses.map(course => {
    return (
      <Route
        key={shortid.generate()}
        path={`${course.route}`}
        render={routerProps => (
          <div>
            <Course
              {...routerProps}
              title={course.title}
              description={course.description}
              topics={course.topics}
              link={course.link}
            />
          </div>
        )}
      />
    );
  });
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout />
          <Switch>
            <Route path="/upload" exact component={Upload} />
            <Route path="/auth" exact component={Auth} />
            {dynamicRouting(CourseData)}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
