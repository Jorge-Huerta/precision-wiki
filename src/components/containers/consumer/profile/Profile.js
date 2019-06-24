import React, {Component} from "react";
import {connect} from "react-redux";
import * as usersActions from "../../../store/actions/index";

import API from "../../../API/api";

import MaterialTable from "material-table";
import localization from "../../admin/config/localization";

class Profile extends Component {
  state = {
    columns: [
      {title: "Usuario", field: "username"},
      {title: "Nombre", field: "nombre"},
      {title: "Contraseña", field: "password", editable: "onUpdate"}
    ],
    user: [
      {
        username: "",
        nombre: "",
        password: ""
      }
    ]
  };

  componentDidMount() {
    return API.get(`/usuario/${this.props.token.id}`)
      .then(res => {
        this.setState({
          ...this.state,
          user: res.data
        });
        console.log("res es", this.state.user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <MaterialTable
        title="Perfil"
        columns={this.state.columns}
        data={this.state.user}
        editable={{
          onRowUpdate: (newData, oldData) => {
            return API.put(`/usuario/${oldData.id}`, newData)
              .then(res => {
                const data = [...this.state.user];
                const index = data.indexOf(oldData);
                data[index] = newData;
                this.setState({user: data});
              })
              .catch(err => {
                console.log(err);
              });
          }
        }}
        localization={localization}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.decodedToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitUsers: () => dispatch(usersActions.initUsers()),
    onUsersCreated: newData => dispatch(usersActions.addUsers(newData)),
    onUsersUpdated: (oldData, newData) =>
      dispatch(usersActions.putUsers(oldData, newData)),
    onUsersDelete: oldData => dispatch(usersActions.removeUsers(oldData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
