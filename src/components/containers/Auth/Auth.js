import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import AuthForm from "./AuthForm";
import AuthCard from "./AuthCard";

class Auth extends Component {
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
          <AuthCard>
            <AuthForm />
          </AuthCard>
        </Grid>
      </Grid>
    );
  }
}

export default Auth;
