import React, {Component} from "react";
import CourseCard from "./CourseCard";
import Grid from "@material-ui/core/Grid";
import Modal from "./CourseModal";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles/grid-styles";

import {connect} from "react-redux";
import {compose} from "redux";
import * as filesActions from "../../../store/actions/index";

import shortid from "shortid";

const linksToModals = links => {
  return links.map(link => {
    return <Modal key={shortid.generate()} data={link} />;
  });
};

class Course extends Component {
  componentDidMount() {
    this.props.onInitFiles(this.props.data.id);
  }

  render() {
    console.log("[Course props]", this.props);
    return (
      <div className={this.props.data.root}>
        <Grid
          container
          spacing={8}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={4}>
            <CourseCard>
              <h1>{this.props.data.nombre}</h1>
            </CourseCard>
          </Grid>

          <Grid item xs={4}>
            <CourseCard>
              <h1>{this.props.data.descripcion}</h1>
            </CourseCard>
          </Grid>

          <Grid item xs={8}>
            <CourseCard>{linksToModals(this.props.files)}</CourseCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    files: state.files.files
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitFiles: courseId => dispatch(filesActions.initFiles(courseId))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Course);
