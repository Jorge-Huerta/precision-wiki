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
      {title: "Contraseña", field: "password"}
    ],
    user: [{id: "", username: "", nombre: "", password: ""}]
  };

  componentDidMount() {
    API.get(`/usuario/${this.props.token.id}`)
      .then(res => {
        console.log("la res es ", res.data);
        this.setState({user: [res.data]});
        console.log("el user es", this.state.user);
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
        options={{
          search: false
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.decodedToken
  };
};

export default connect(mapStateToProps)(Profile);
