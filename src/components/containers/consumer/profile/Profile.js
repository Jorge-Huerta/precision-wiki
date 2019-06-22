import React, {Component} from "react";
import {connect} from "react-redux";
import * as usersActions from "../../../store/actions/index";
import shortid from "shortid";

import MaterialTable from "material-table";
import localization from "../../admin/config/localization";

class Profile extends Component {
  state = {
    columns: [
      {title: "Usuario", field: "username"},
      {title: "Nombre", field: "nombre"},
      {title: "Contraseña", field: "password", editable: "onUpdate"}
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
          onRowUpdate: (newData, oldData) => {
            return this.props.onUsersUpdated(oldData, newData);
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
)(Profile);
