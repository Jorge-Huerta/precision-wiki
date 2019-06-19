import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {connect} from "react-redux";
import {compose} from "redux";
import * as authActions from "../../store/actions/index";

import {withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./styles/authform-styles";

class AuthForm extends Component {
  state = {
    controls: {
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Usuario"
        },
        value: "",
        validation: {
          required: true
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

  handleChange = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value
      }
    };
    this.setState({controls: updatedControls});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.username.value,
      this.state.controls.password.value
    );
  };

  render() {
    const {classes} = this.props;
    const {
      controls: {username, password}
    } = this.state;
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    let authRedirect = null;

    if (this.props.decodedToken.administrador) {
      authRedirect = <Redirect to="/usermanagement" />;
    } else if (this.props.decodedToken.aportador) {
      authRedirect = <Redirect to="/upload" />;
    } else if (
      !this.props.token.administrador &&
      !this.props.token.aportador &&
      this.props.token.id != null
    ) {
      authRedirect = <Redirect to="/management" />;
    }

    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        {errorMessage}
        {authRedirect}
        <TextField
          label="Usuario"
          type="text"
          className={classes.textField}
          value={username.value}
          onChange={event => this.handleChange(event, "username")}
          margin="normal"
          variant="outlined"
          InputLabelProps={{shrink: true}}
        />
        <TextField
          label="Contraseña"
          type="password"
          className={classes.textField}
          value={password.value}
          onChange={event => this.handleChange(event, "password")}
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

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    error: state.auth.error,
    decodedToken: state.auth.decodedToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(authActions.auth(username, password))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(AuthForm);
