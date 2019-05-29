import React, {Component} from "react";
import CreateCard from "./CreateCard";
import Grid from "@material-ui/core/Grid";
import CreateForm from "./CreateForm";

class Create extends Component {
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
          <CreateCard>
            <h1>hola</h1>
          </CreateCard>
        </Grid>
      </Grid>
    );
  }
}

export default Create;
