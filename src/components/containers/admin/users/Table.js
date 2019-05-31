import React, {Component} from "react";
import API from "../../../API/api";
import shortid from "shortid";

import MaterialTable from "material-table";
import localization from "./localization";

class Table extends Component {
  state = {
    columns: [
      {title: "Usuario", field: "user"},
      {title: "Contraseña", field: "password", editable: "onUpdate"},
      {
        title: "Tipo",
        field: "type",
        lookup: {1: "Consumidor", 2: "Administrador"}
      }
    ],
    users: [{id: "", user: "", password: "", type: ""}]
  };

  componentDidMount() {
    API.get("/users").then(response => {
      this.setState({users: response.data});
    });
  }

  render() {
    return (
      <MaterialTable
        title="Gestión de Usuarios"
        columns={this.state.columns}
        data={this.state.users}
        editable={{
          onRowAdd: newData => {
            newData.password = shortid.generate();
            this.setState({users: [...this.state.users, newData]});
            return API.post("/users", newData)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          },
          onRowUpdate: (newData, oldData) => {
            const data = this.state.users;
            const index = data.indexOf(oldData);
            data[index] = newData;
            this.setState({users: data});

            return API.put(`/users/${oldData.id}`, {
              user: newData.user,
              password: newData.password,
              type: newData.type
            })
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          },
          onRowDelete: oldData => {
            const data = this.state.users;
            const index = data.indexOf(oldData);
            data.splice(index, 1);
            this.setState({users: data});
            console.log(index);
            return API.delete(`/users/${oldData.id}`)
              .then(res => {
                console.log(res);
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

export default Table;
