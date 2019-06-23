import React, {Component} from "react";
import {connect} from "react-redux";
import * as usersActions from "../../../store/actions/index";
import shortid from "shortid";

import MaterialTable from "material-table";
import localization from "../config/localization";

class Table extends Component {
  state = {
    columns: [
      {title: "Usuario", field: "username"},
      {title: "Nombre", field: "nombre"},
      {title: "Contraseña", field: "password", editable: "onUpdate"},
      {
        title: "Administrador",
        field: "administrador",
        lookup: {true: "Sí", false: "No"}
      }
    ]
  };

  componentDidMount() {
    this.props.onInitUsers();
  }

  render() {
    return (
      <MaterialTable
        title="Gestión de Usuarios"
        columns={this.state.columns}
        data={this.props.usr}
        editable={{
          onRowAdd: newData => {
            newData.password = shortid.generate();
            return this.props.onUsersCreated(newData);
          },
          onRowUpdate: (newData, oldData) => {
            return this.props.onUsersUpdated(oldData, newData);
          },
          onRowDelete: oldData => {
            return this.props.onUsersDelete(oldData);
          }
        }}
        localization={localization}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    usr: state.users.users
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
)(Table);
