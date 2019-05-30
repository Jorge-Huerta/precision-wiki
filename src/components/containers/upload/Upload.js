import React, {Component} from "react";
import SimpleCard from "./SimpleCard";
import Grid from "@material-ui/core/Grid";
import Zone from "./Zone";

class Upload extends Component {
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={3}>
          <SimpleCard>
            <Zone />
          </SimpleCard>
        </Grid>
      </Grid>
    );
  }
}

export default Upload;
