import React, {Component} from "react";
import CourseCard from "./CourseCard";
import Grid from "@material-ui/core/Grid";

class Course extends Component {
  render() {
    const data = this.props

    return (
      <Grid
        container
        spacing={24}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={8}>
          <h1>{data.title}</h1>
        </Grid>

        <Grid item xs={8}>
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
    );
  }
}

export default Course;
