import React from "react";

import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./styles/createform-styles";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

class CreateForm extends React.Component {
  state = {
    controls: {
      courseName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nombre"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Descripción"
        },
        value: "",
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false
      }
    }
  };

  componentDidMount() {
    axios.get('https://my-json-server.typicode.com/dissonants/precisiondb/posts')
  }

  handleChange = name => ({target: {value}}) => {
    this.setState({
      controls: {
        ...this.state.controls,
        [name]: value
      }
    });
  };

  render() {
    const {classes} = this.props;
    const {
      controls: {courseName, description}
    } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Grid
          container
          spacing={8}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={6} direction="column">
            <TextField
              label="Nombre"
              type="text"
              className={classes.textField}
              value={courseName.value}
              onChange={this.handleChange("courseName")}
              margin="normal"
              variant="outlined"
              InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid item xs={6} direction="column">
            <TextField
              label="Descripción"
              type="text"
              className={classes.textField}
              value={description.value}
              onChange={this.handleChange("description")}
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              InputLabelProps={{shrink: true}}
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" className={classes.button}>
          Agregar
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(CreateForm);
