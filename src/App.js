import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Layout from "./components/functionals/layout/Layout";
import Course from "./components/containers/course/Course";
import Upload from "./components/containers/upload/Upload";
import Create from "./components/containers/admin/create/Create";
import Update from "./components/containers/admin/update/Update";
import Delete from "./components/containers/admin/delete/Delete";
import Auth from "./components/containers/Auth/Auth";

import shortid from "shortid";

import axios from "axios";

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
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get("https://my-json-server.typicode.com/dissonants/precisiondb/courses")
      .then(response => {
        this.setState({posts: response.data});
      });
  }

  render() {
    const posts = dynamicRouting(this.state.posts);

    return (
      <Router>
        <div>
          <Layout />
          <Switch>
            <Route path="/create" exact component={Create} />
            <Route path="/update" exact component={Update} />
            <Route path="/delete" exact component={Delete} />
            <Route path="/upload" exact component={Upload} />
            <Route path="/auth" exact component={Auth} />
            {posts}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
