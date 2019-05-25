import React, {Component} from "react";
import CreateCard from "./CreateCard";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import styles from "./styles/paper-styles";
import CreateForm from "./CreateForm";

class Create extends Component {
  render() {
    const classes = styles;

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
            <CreateForm />
          </CreateCard>
        </Grid>
      </Grid>
    );
  }
}

export default Create;
