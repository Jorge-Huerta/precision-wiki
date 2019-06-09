import React, {Component} from "react";
import API from "../../../API/api";
import shortid from "shortid";

import MaterialTable from "material-table";
import localization from "./localization";

class Table extends Component {
  state = {
    columns: [
      {title: "Usuario", field: "username"},
      {title: "Contraseña", field: "password", editable: "onUpdate"},
      {
        title: "Aportador",
        field: "aportador",
        lookup: {true: "Sí", false: "No"}
      },
      {
        title: "Administrador",
        field: "administrador",
        lookup: {true: "Sí", false: "No"}
      }
    ],
    users: [
      {id: "", nombre: "", password: "", aportador: true, administrador: true}
    ]
  };

  componentDidMount() {
    API.get("/usuario").then(response => {
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
            return API.post("/usuario", newData)
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

            return API.put(`/usuario/${oldData.id}`, {
              nombre: newData.user,
              password: newData.password,
              aportador: newData.aportador,
              administrador: newData.administrador
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
            return API.delete(`/usuario/${oldData.id}`)
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
