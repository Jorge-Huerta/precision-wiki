import React, {Component} from "react";

import API from "../../../API/api";
import shortid from "shortid";

import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./styles/createform-styles";
import Grid from "@material-ui/core/Grid";

class CreateForm extends Component {
  state = {
    title: "",
    description: ""
  };

  handleChange = name => ({target: {value}}) => {
    this.setState({
      [name]: value
    });
    console.log(this.state.title, this.state.description);
  };

  handleSubmit = event => {
    event.preventDefault();
    const formatedRoute = this.state.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const course = {
      id: shortid.generate(),
      title: this.state.title,
      description: this.state.description,
      route: `/${formatedRoute}`,
      topics: "Átomo",
      link: "hola"
    };

    API.post("/courses", {
      course
    }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={8} alignItems="center" justify="center">
          <Grid item xs={6}>
            <TextField
              label="Nombre"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleChange("title")}
              margin="normal"
              variant="outlined"
              InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              multiline
              rows="5"
              label="Descripción"
              className={classes.textField}
              value={this.state.description}
              onChange={this.handleChange("description")}
              margin="normal"
              variant="outlined"
              InputLabelProps={{shrink: true}}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Agregar
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(CreateForm);
