import React, {Component} from "react";
import CourseCard from "./CourseCard";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles/grid-styles";

class Course extends Component {
  render() {
    const data = this.props;

    return (
      <div className={data.root}>
        <Grid
          container
          spacing={8}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={4}>
            <CourseCard>
              <h1>{data.title}</h1>
            </CourseCard>
          </Grid>

          <Grid item xs={4}>
            <CourseCard>
              <h1>{data.description}</h1>
            </CourseCard>
          </Grid>

          <Grid item xs={8}>
            <CourseCard>
              <h1>{data.topics}</h1>
            </CourseCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Course);
