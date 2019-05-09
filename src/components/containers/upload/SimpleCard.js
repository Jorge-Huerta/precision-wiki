import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import styles from "./styles/simplecard-styles";

function SimpleCard(props) {
  const {classes} = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card} >
      <CardContent>
        Nombres
      </CardContent>
      <CardActions>
        {props.children}
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
