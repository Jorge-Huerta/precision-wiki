import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import API from "./components/API/api";

import Layout from "./components/functionals/layout/Layout";
import Course from "./components/containers/course/Course";
import Upload from "./components/containers/upload/Upload";
import CourseManagement from "./components/containers/admin/courses/CourseManagement";
import UserManagement from "./components/containers/admin/users/UserManagement";
import Auth from "./components/containers/Auth/Auth";

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
            />
          </div>
        )}
      />
    );
  });
};

class App extends Component {
  state = {
    courses: []
  };

  componentDidMount() {
    API.get("/courses").then(response => {
      this.setState({courses: response.data});
    });
  }

  render() {
    const courses = dynamicRouting(this.state.courses);

    return (
      <Router>
        <div>
          <Layout />
          <Switch>
            <Route path="/usermanagement" exact component={UserManagement} />
            <Route
              path="/coursemanagement"
              exact
              component={CourseManagement}
            />
            <Route path="/upload" exact component={Upload} />
            <Route path="/auth" exact component={Auth} />
            {courses}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
