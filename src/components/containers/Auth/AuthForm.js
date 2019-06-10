import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./styles/authform-styles";
import * as actions from "../../store/actions/index";

class AuthForm extends React.Component {
  state = {
    hola: "",
    controls: {
      user: {
        elementType: "input",
        elementConfig: {
          type: "text",
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
  };

  handleSubmit = event => {
    event.prevenDefault();
    this.props.onAuth(
      this.state.controls.user.value,
      this.state.controls.password.value
    );
  };

  render() {
    const {classes} = this.props;
    const {
      controls: {user, password}
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Usuario"
          type="text"
          className={classes.textField}
          value={user.value}
          onChange={this.handleChange("user")}
          margin="normal"
          variant="outlined"
          InputLabelProps={{shrink: true}}
        />

        <TextField
          label="Contraseña"
          type="password"
          className={classes.textField}
          value={password.value}
          onChange={this.handleChange("password")}
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          InputLabelProps={{shrink: true}}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Ingresar
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (user, password) => dispatch(actions.auth(user, password))
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AuthForm);
