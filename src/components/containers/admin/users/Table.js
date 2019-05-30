import React, {Component} from "react";
import API from "../../../API/api";
import shortid from "shortid";

import MaterialTable from "material-table";

class Table extends Component {
  state = {
    columns: [
      {title: "Usuario", field: "user"},
      {title: "Contraseña", field: "password", editable: "onUpdate"}
    ],
    users: [{id: "", user: "", password: ""}]
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
              password: newData.password
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
            return API.delete(`/users/${oldData.id}`)
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          }
        }}
      />
    );
  }
}

export default Table;
