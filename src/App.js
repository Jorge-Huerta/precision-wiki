import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {connect} from "react-redux";
import * as userCoursesActions from "./components/store/actions/index";

import Layout from "./components/functionals/layout/Layout";
import Course from "./components/containers/consumer/course/Course";
import Profile from "./components/containers/consumer/profile/Profile";
import Management from "./components/containers/consumer/management/Management";
import Upload from "./components/containers/upload/Upload";
import CourseManagement from "./components/containers/admin/courses/CourseManagement";
import UserManagement from "./components/containers/admin/users/UserManagement";
import FileManagement from "./components/containers/admin/files/FileManagement";
import Auth from "./components/containers/Auth/Auth";
import Logout from "./components/containers/Auth/Logout/Logout";

import shortid from "shortid";

const dynamicRouting = courses => {
  return courses.map(course => {
    return (
      <Route
        key={shortid.generate()}
        path={`${course.ruta}`}
        render={routerProps => (
          <div>
            <Course {...routerProps} data={course} />
          </div>
        )}
      />
    );
  });
};

const dynamicRoutingAdminCourses = courses => {
  return courses.map(course => {
    return (
      <Route
        key={shortid.generate()}
        path={`${course.ruta}`}
        render={routerProps => (
          <div>
            <FileManagement {...routerProps} data={course} />
          </div>
        )}
      />
    );
  });
};

class App extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.props.onGetCourses(this.props.token.id);
      this.props.onGetAllCourses();
    }
  }

  render() {
    const courses = dynamicRouting(this.props.crs);
    const allCourses = dynamicRoutingAdminCourses(this.props.allCrs);

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
            <Route path="/filemanagement" exact component={FileManagement} />
            <Route path="/upload" exact component={Upload} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/profile" exact component={Profile} />
            {courses}
            {allCourses}
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.decodedToken,
    crs: state.userCourses.myCourses,
    allCrs: state.courses.courses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCourses: userId => dispatch(userCoursesActions.getUserCourses(userId)),
    onGetAllCourses: () => dispatch(userCoursesActions.initCourses())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
