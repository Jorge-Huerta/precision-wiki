import React from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./styles/authform-styles";

class AuthForm extends React.Component {
  state = {
    hola: "",
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
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

  handleChange = name => ({target: {value}}) => {
    this.setState({
      controls: {
        ...this.state.controls,
        [name]: value
      }
    });
    console.log("eye");
  };

  render() {
    const {classes} = this.props;
    const {
      controls: {email, password}
    } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Email"
          type="email"
          className={classes.textField}
          value={email.value}
          onChange={this.handleChange("email")}
          margin="normal"
          variant="outlined"
          InputLabelProps={{shrink: true}}
        />

        <TextField
          label="Password"
          type="password"
          className={classes.textField}
          value={password.value}
          onChange={this.handleChange("password")}
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          InputLabelProps={{shrink: true}}
        />
        <Button variant="contained" color="primary" className={classes.button}>
          Primary
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(AuthForm);
