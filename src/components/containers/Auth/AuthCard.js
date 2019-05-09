import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styles from "./styles/authcard-styles";

function AuthCard(props) {
  const {classes} = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card} >
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  );
}

AuthCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthCard);
